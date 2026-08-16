// index.ts
import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { connectDB } from './config/database.js'
import { auth } from './auth/auth.js'

const app = new Hono()
const port = Number(process.env.PORT) || 3000

app.use(
  '*',
  cors({
    origin: process.env.FRONTEND_URL,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
)

app.on(
  ['POST', 'GET'],
  '/api/auth/**',
  (c) => auth.handler(c.req.raw)
)

await connectDB()


serve({
  fetch: app.fetch,
  port,
})

console.log(`Servidor escuchando en http://localhost:${port}`)
