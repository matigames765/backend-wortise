import { z } from 'zod'

export const authSchema = z.object({
  email: z
    .string()
    .email('El email no es válido'),

  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
})
