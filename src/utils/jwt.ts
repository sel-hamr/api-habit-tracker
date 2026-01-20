import { createSecretKey } from 'crypto'
import { jwtVerify, SignJWT } from 'jose'
import env from '../../env.ts'

export type JwtPayload = {
  id: string
  email: string
  username: string
}

const getSecretKey = () => {
  const secret = env.JWT_SECRET
  const secretKey = createSecretKey(secret, 'utf-8')
  return secretKey
}
export const generateToken = (payload: JwtPayload) => {
  const secret = env.JWT_SECRET
  const secretKey = createSecretKey(secret, 'utf-8')
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN || '7d')
    .sign(secretKey)
}

export const verifyToken = async (token: string): Promise<JwtPayload> => {
  const secretKey = getSecretKey()
  const { payload } = await jwtVerify(token, secretKey)
  return payload as JwtPayload
}
