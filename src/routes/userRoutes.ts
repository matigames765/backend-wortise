import { Hono } from 'hono'

const userRoutes = new Hono()

userRoutes.get('/', (c) => {
  return c.json({ message: 'Obtener usuarios todavía no implementado' }, 501)
})

userRoutes.post('/', (c) => {
  return c.json({ message: 'Crear usuario todavía no implementado' }, 501)
})

export default userRoutes
