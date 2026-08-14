import 'dotenv/config'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import userRoutes from './routes/userRoutes.js'

const app = new Hono()

const port = Number(process.env.PORT) || 3000

serve({
  fetch: app.fetch,
  port,
})

console.log(`Servidor escuchando en http://localhost:${port}`)

app.route('/users', userRoutes)
