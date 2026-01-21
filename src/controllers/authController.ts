import type { Request, Response } from 'express'
import { db } from '../db/connection.ts'
import { users } from '../db/schema.ts'
import { comparePassword, hashPassword } from '../utils/passwords.ts'
import { generateToken } from '../utils/jwt.ts'
import { eq } from 'drizzle-orm'
import { sendResponse } from '../utils/responseFormatter.ts'

export const register = async (req: Request, res: Response) => {
  try {
    const { password } = req.body
    const hashedPassword = await hashPassword(password)
    const [user] = await db
      .insert(users)
      .values({
        ...req.body,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        createdAt: users.createdAt,
      })
    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })
    return sendResponse(
      res,
      true,
      { user, token },
      201,
      'User registered successfully',
    )
  } catch (error) {
    console.error('Registration error', error)
    return sendResponse(res, false, 'Failed to register user', 500)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })
    if (!user) {
      return sendResponse(res, false, 'Invalid credentials', 401)
    }
    const isValidatedPassword = await comparePassword(password, user.password)
    if (!isValidatedPassword) {
      return sendResponse(res, false, 'Invalid credentials', 401)
    }
    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })
    return sendResponse(res, true, {
      message: 'Login success',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
      token,
    })
  } catch (error) {
    console.log('Logging error', error)
    return sendResponse(res, false, 'Failed to Login', 500)
  }
}
