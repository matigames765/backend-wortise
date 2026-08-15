import { getDB } from '../config/database.js';
export const getUser = async (c) => {
    try {
        const id = c.req.param('id');
        const db = getDB();
        const user = await db.collection('users').findOne({
            _id: new Object(id)
        });
        return c.json(user);
    }
    catch (error) {
        console.error('Error al obtener el usuario:', error);
        return c.json({ message: 'No se pudo encontrar el usuario' }, 404);
    }
};
export const postUser = async (c) => {
    try {
        const db = getDB();
        const data = c.req.valid('json');
        const result = await db.collection('users').insertOne({
            email: data.email,
            password: data.password,
        });
        return c.json({
            message: 'Usuario creado',
            id: result.insertedId,
        }, 201);
    }
    catch (error) {
        console.error(error);
        return c.json({
            message: 'Error creando usuario',
        }, 500);
    }
};
