import { Hono } from 'hono'
import { getUser, postUser } from '../controllers/userController.js'
import { zValidator } from '@hono/zod-validator'
import { createUserSchema } from '../schemas/userSchema.js'

const userRoutes = new Hono()

userRoutes.get('/:id', getUser)
userRoutes.post('/', zValidator('json', createUserSchema), postUser)

export default userRoutes
