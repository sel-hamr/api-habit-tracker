import type { Request, Response, NextFunction } from 'express'
import { verifyToken, type JwtPayload } from '../utils/jwt.ts'

export type AuthenticatedRequest = Request & {
  user?: JwtPayload
}

export const authenticatedToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        error: 'bad Request',
      })
    }
    const payload = await verifyToken(token)
    req.user = payload
    next()
  } catch (error) {
    res.status(403).json({
      error: 'Forbidden',
    })
  }
}
