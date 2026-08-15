// index.ts
import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import userRoutes from './routes/userRoutes.js'
import { connectDB } from './config/database.js'

const app = new Hono()
const port = Number(process.env.PORT) || 3000

app.use(
  '*',
  cors({
    origin: process.env.FRONTEND_URL,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
)

await connectDB()

app.route('/users', userRoutes)

serve({
  fetch: app.fetch,
  port,
})

console.log(`Servidor escuchando en http://localhost:${port}`)
