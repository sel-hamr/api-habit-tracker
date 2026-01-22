import { env, isDev } from '../env.ts'
import { initializeRedisClient } from './config/redis.ts'

let redisInitialized = false

async function start() {
  if (!redisInitialized) {
    await initializeRedisClient()
    redisInitialized = true
  }

  if (isDev()) {
    const { app } = await import('./server.ts')
    app.listen(env.PORT, () => {
      console.log(`Dev server running on port: ${env.PORT}`)
    })
  } else {
    // Production: cluster mode
    const { startCluster } = await import('./utils/cluster.ts')
    await startCluster()
  }
}

start().catch(console.error)
