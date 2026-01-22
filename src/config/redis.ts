import { createClient } from 'redis'
import type { RedisClientType } from 'redis'
import env from '../../env.ts'

let redisClient: RedisClientType | null = null

export async function initializeRedisClient(): Promise<RedisClientType> {
  try {
    if (redisClient?.isOpen) return redisClient

    redisClient = createClient({
      socket: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
      },
    })

    redisClient.on('error', (err) => console.error('Redis error:', err))
    redisClient.on('connect', () => console.log('Redis connected'))
    redisClient.on('ready', () => console.log('Redis ready'))

    await redisClient.connect()
    console.log('✅ Redis initialized')
    return redisClient
  } catch (error) {
    console.error('❌ Redis initialization failed:', error)
    process.exit(1)
  }
}

export function getRedisClient(): RedisClientType | null {
  try {
    if (!redisClient?.isOpen) {
      throw new Error('Redis not connected')
    }
    return redisClient
  } catch (error) {
    console.error('❌ Error:', error)
    return null
  }
}

export async function disconnectRedis(): Promise<void> {
  try {
    if (redisClient?.isOpen) {
      await redisClient.quit()
      redisClient = null
      console.log('✅ Redis disconnected')
    }
  } catch (error) {
    console.error('❌ Disconnect error:', error)
  }
}
