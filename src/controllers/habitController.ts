import type { Response } from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import { db } from '../db/connection.ts'
import { habits, habitTags } from '../db/schema.ts'
import { eq, and, desc } from 'drizzle-orm'
import { sendResponse } from '../utils/responseFormatter.ts'

export const createHabit = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, description, frequency, targetCount, tagIds } = req.body
    const userId = req.user!.id

    const result = await db.transaction(async (tx) => {
      const [newHabit] = await tx
        .insert(habits)
        .values({
          userId,
          name,
          description,
          frequency,
          targetCount,
        })
        .returning()
      if (tagIds && tagIds.length > 0) {
        const habitTagValues = tagIds.map((tagId: string) => ({
          habitId: newHabit.id,
          tagId,
        }))
        await tx.insert(habitTags).values(habitTagValues)
      }
    })
    res.status(201).json({
      message: 'Habit created successfully',
      habit: result,
    })
  } catch (error) {
    console.error('Create habit error:', error)
    res.status(500).json({ error: 'Failed to create habit' })
  }
}

export const getUserHabits = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id
    const userHabitWithTags = await db.query.habits.findMany({
      where: eq(habits.userId, userId),
      with: {
        habitTags: {
          with: {
            tag: true,
          },
        },
      },
      orderBy: [desc(habits.createdAt)],
    })
    const habitsWithTags = userHabitWithTags.map((habit) => ({
      ...habit,
      tags: habit.habitTags.map((tag) => tag.tag),
      habitTags: undefined,
    }))
    res.json({
      habits: habitsWithTags,
    })
  } catch (error) {
    console.error('Get habits error:', error)
    res.status(500).json({ error: 'Failed to fetch habits' })
  }
}

export const updateHabits = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { id } = req.params
    const userId = req.user?.id
    const { tagIds, ...updates } = req.body

    const result = await db.transaction(async (tx) => {
      const [updatedHabit] = await tx
        .update(habits)
        .set({ ...updates, updateAt: new Date() })
        .where(and(eq(habits.id, id), eq(habits.userId, userId)))
        .returning()

      if (!updatedHabit) {
        throw new Error('Habit not found')
      }

      if (tagIds !== undefined) {
        await tx.delete(habitTags).where(eq(habitTags.habitId, id))
        if (tagIds.length > 0) {
          const habitTagValues = tagIds.map((tagId: string) => ({
            habitId: id,
            tagId,
          }))
          await tx.insert(habitTags).values(habitTagValues)
        }
        return updatedHabit
      }
    })
    res.json({
      message: 'Habit updated successfully',
      habit: result,
    })
  } catch (error) {
    if (error.message === 'Habit not found') {
      return res.status(404).json({ error: 'Habit not found' })
    }
    console.error('Update habit error:', error)
    res.status(500).json({ error: 'Failed to update habit' })
  }
}

export const deleteHabit = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req?.user?.id
    const [deletedHabit] = await db
      .delete(habits)
      .where(and(eq(habits.id, id), eq(habits.userId, userId)))
      .returning()

    if (!deletedHabit) {
      return res.status(404).json({ error: 'Habit not found' })
    }
    res.json({
      message: 'Habit deleted successfully',
    })
  } catch (error) {
    console.error('Delete habit error:', error)
    res.status(500).json({ error: 'Failed to delete habit' })
  }
}

export const getHabitById = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { id } = req.params
    const userId = req.user?.id
    const user = await db.query.habits.findFirst({
      where: and(eq(habits.id, id), eq(habits.userId, userId)),
      with: {
        habitTags: {
          with: {
            tag: true,
          },
        },
      },
    })
    const tags = user?.habitTags.map((ht) => ht.tag) || []
    if (user) {
      delete user.habitTags
    }
    user && (user['tags'] = tags)

    res.status(200).json({ data: user })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ error: 'Failed to fetch habit' })
  }
}

export const completeHabit = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { id } = req.params
    const { note } = req.body
    const userId = req.user.id
    const result = await db.transaction(async (tx) => {
      const habit = await tx.query.habits.findFirst({
        where: and(eq(habits.id, id), eq(habits.userId, userId)),
      })
      if (!habit) {
        throw new Error('Habit not found')
      }
      const [newEntry] = await tx
        .update(habits)
        .set({
          isComplete: true,
          note: note,
          updateAt: new Date(),
        })
        .where(eq(habits.id, id))
        .returning()
      return newEntry
    })
    res.json({ message: 'Habit completed successfully', entry: result })
  } catch (error) {
    if (error.message === 'Habit not found') {
      return res.status(404).json({ error: 'Habit not found' })
    }
    console.error('Complete habit error:', error)
    res.status(500).json({ error: 'Failed to complete habit' })
  }
}

export const getHabitsByTag = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { tagId } = req.params
    const userId = req.user?.id
    const habitsByTag = await db.query.habits.findMany({
      where: and(eq(habits.userId, userId), eq(habitTags.tagId, tagId)),
      with: {
        habitTags: {
          with: {
            tag: true,
          },
        },
      },
    })
    const habitsWithTags = habitsByTag.map((habit) => ({
      ...habit,
      tags: habit.habitTags.map((tag) => tag.tag),
      habitTags: undefined,
    }))
    res.json({ habits: habitsWithTags })
  } catch (error) {
    console.error('Get habits by tag error:', error)
    res.status(500).json({ error: 'Failed to fetch habits by tag' })
  }
}

export const addTagsToHabit = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user.id
    const { id } = req.params
    const { tagIds } = req.body
    const isUserHavingHabit = await db.query.habits.findFirst({
      where: and(eq(habits.id, id), eq(habits.userId, userId)),
    })
    if (!isUserHavingHabit) {
      return sendResponse(res, false, 'Habit not found', 404)
    }
    const tags = tagIds.map((tagId) => ({
      tagId,
      habitId: id,
    }))
    await db.insert(habitTags).values(tags)
    return sendResponse(
      res,
      true,
      { message: 'Tags added to habit successfully', tags },
      200,
    )
  } catch (error) {
    console.error('Add tags to habit error:', error)
    return sendResponse(res, false, 'Failed to add tags to habit', 500)
  }
}
