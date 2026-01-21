import cluster from 'cluster'
import os from 'os'
import env from '../../env.ts'

const numCPUs = os.cpus().length

export async function startCluster() {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`)
    console.log(`Forking ${numCPUs} workers...`)

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
    }

    // Handle worker exit
    cluster.on('exit', (worker, code, signal) => {
      console.log(
        `Worker ${worker.process.pid} died (${signal || code}). Restarting...`,
      )
      cluster.fork()
    })

    // Log when workers are online
    cluster.on('online', (worker) => {
      console.log(`Worker ${worker.process.pid} is online`)
    })
  } else {
    // Workers share the same TCP connection
    const { app } = await import('../server.ts')

    app.listen(env.PORT, () => {
      console.log(`Worker ${process.pid} started on port ${env.PORT}`)
    })
  }
}
