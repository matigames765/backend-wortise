import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
const app = new Hono();
const port = Number(process.env.PORT) || 3000;
// Ruta de ejemplo
// GET http://localhost:3000/
app.get('/', (c) => {
    return c.json({
        message: 'API funcionando con Hono 🔥',
    });
});
serve({
    fetch: app.fetch,
    port,
});
console.log(`Servidor escuchando en http://localhost:${port}`);
/*
// Más adelante podrías importar tus rutas así:

import authRoutes from './routes/Usuario/authRoutes'
import userRoutes from './routes/Usuario/userRoutes'
import productoRoutes from './routes/Producto/productoRoutes'

// Y montarlas usando app.route()
app.route('/auth', authRoutes)
app.route('/users', userRoutes)
app.route('/productos', productoRoutes)
*/
