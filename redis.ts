import { createClient } from 'redis'

async function main() {
  const client = createClient({
    url: 'redis://127.0.0.1:6379', // host = Redis on Windows
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
    },
  })

  client.on('error', (err) => console.error('Redis error:', err))

  await client.connect()
  console.log('Redis connected')

  await client.set('test', 'hello')
  const value = await client.get('test')
  console.log('Value from Redis:', value)

  await client.quit()
}

main()
