import { and, eq } from 'drizzle-orm'
import { users } from './../db/schema.ts'
import db from '../db/connection.ts'
import type { Response } from 'express'

import type { AuthenticatedRequest } from '../middleware/auth.ts'

export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await db.query.users.findMany({
      with: {
        habits: {
          with: {
            entries: true,
          },
        },
      },
    })
    if (!users) {
      return res.status(404).json({ error: 'No users found' })
    }
    res.status(200).json({ users })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        habits: {
          with: {
            entries: true,
          },
        },
      },
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    user.password = undefined
    res.status(200).json({ user })
  } catch (error) {
    console.error('Get user by ID error:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
}
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params
    const { username, email, firstName, lastName } = req.body
    const [updatedUser] = await db
      .update(users)
      .set({
        username,
        email,
        firstName,
        lastName,
      })
      .where(and(eq(users.id, id), eq(users.id, req.user?.id)))
      .returning()
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ user: updatedUser })
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({ error: 'Failed to update user' })
  }
}

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params
    const [deletedUser] = await db
      .delete(users)
      .where(and(eq(users.id, id), eq(users.id, req.user?.id)))
      .returning()
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json({
      message: 'User deleted successfully',
    })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ error: 'Failed to delete user' })
  }
}
