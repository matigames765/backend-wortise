import { getDB } from '../config/database.js';
const USERS_COLLECTION = 'users';
export const getUser = async (c) => {
    try {
        const users = await getDB().collection(USERS_COLLECTION).find().toArray();
        return c.json(users);
    }
    catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return c.json({ message: 'No se pudieron obtener los usuarios' }, 500);
    }
};
export const postUser = async (c) => {
    try {
        const user = await c.req.json();
        if (!user || Array.isArray(user) || Object.keys(user).length === 0) {
            return c.json({ message: 'El usuario es requerido' }, 400);
        }
        const result = await getDB().collection(USERS_COLLECTION).insertOne(user);
        return c.json({
            ...user,
            _id: result.insertedId,
        }, 201);
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            return c.json({ message: 'El cuerpo de la solicitud debe ser un JSON válido' }, 400);
        }
        console.error('Error al crear el usuario:', error);
        return c.json({ message: 'No se pudo crear el usuario' }, 500);
    }
};
