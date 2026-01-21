import { and, eq } from 'drizzle-orm'
import { users } from './../db/schema.ts'
import db from '../db/connection.ts'
import type { Response } from 'express'

import type { AuthenticatedRequest } from '../middleware/auth.ts'
import { sendResponse } from '../utils/responseFormatter.ts'

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
      return sendResponse(res, false, 'No users found', 404)
    }
    res.status(200).json({ users })
  } catch (error) {
    console.error('Get users error:', error)
    return sendResponse(res, false, 'Failed to fetch users', 500)
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
      return sendResponse(res, false, 'User not found', 404)
    }
    user.password = undefined
    res.status(200).json({ user })
  } catch (error) {
    console.error('Get user by ID error:', error)
    return sendResponse(res, false, 'Failed to fetch user', 500)
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
      return sendResponse(res, false, 'User not found', 404)
    }
    res.status(200).json({ user: updatedUser })
  } catch (error) {
    console.error('Update user error:', error)
    return sendResponse(res, false, 'Failed to update user', 500)
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
      return sendResponse(res, false, 'User not found', 404)
    }
    return sendResponse(res, true, 'User deleted successfully', 200)
  } catch (error) {
    console.error('Delete user error:', error)
    return sendResponse(res, false, 'Failed to delete user', 500)
  }
}
