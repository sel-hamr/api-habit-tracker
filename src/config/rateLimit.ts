import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import { isTest } from '../../env.ts'
import { getRedisClient } from './redis.ts'

export const apiRateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => getRedisClient().sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: () => isTest(),
  message:
    'Too many requests from this IP, please try again later after 15 minutes.',
})
