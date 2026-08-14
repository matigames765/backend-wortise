import type { Context } from 'hono'
import { getDB } from '../config/database.js'
import type { createUserSchema } from '../schemas/userSchema.js'
import type z from 'zod'

type CreateUserContext = Context<
  {},
  string,
  {
    out: {
      json: z.infer<typeof createUserSchema>
    }
  }
>

const db = getDB()

export const getUser = async (c: Context) => {
  try {
    const id = c.req.param('id')

    const user = await db.collection('users').findOne({
        _id: new Object(id)
    })

    return c.json(user)
  } catch (error) {
    console.error('Error al obtener el usuario:', error)

    return c.json({ message: 'No se pudo encontrar el usuario' }, 404)
  }
}

export const postUser = async (c: CreateUserContext) => {
  try {
    const data = c.req.valid('json')

    const result = await db.collection('users').insertOne({
      email: data.email,
      password: data.password,
    })

    return c.json(
      {
        message: 'Usuario creado',
        id: result.insertedId,
      },
      201,
    )
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Error creando usuario',
      },
      500,
    )
  }
}