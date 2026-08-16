import { Hono } from 'hono';
import { getAuth, postAuth } from '../controllers/authController.js';
import { zValidator } from '@hono/zod-validator';
import { authSchema } from '../schemas/authSchema.js';
const authRoutes = new Hono();
authRoutes.get('/:id', getAuth);
authRoutes.post('/', zValidator('json', authSchema), postAuth);
export default authRoutes;
