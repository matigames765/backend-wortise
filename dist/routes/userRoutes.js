import { Hono } from 'hono';
import { getUser, postUser } from '../controllers/userController.js';
const userRoutes = new Hono();
userRoutes.get('/', getUser);
userRoutes.post('/', postUser);
export default userRoutes;
