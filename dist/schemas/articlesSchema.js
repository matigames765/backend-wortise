import { z } from 'zod';
export const articleSchema = z.object({
    title: z
        .string()
        .min(2, 'El título debe tener al menos 2 caracteres'),
    content: z
        .string()
        .min(10, 'El contenido debe tener al menos 10 caracteres')
});
