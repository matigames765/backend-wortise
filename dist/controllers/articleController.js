import { getDB } from '../config/database.js';
export const postArticle = async (c) => {
    try {
        const db = getDB();
        const data = c.req.valid('json');
        const result = await db.collection('articles').insertOne({
            title: data.title,
            content: data.content,
            userId: data.userId,
            createdAt: new Date(),
        });
        return c.json({
            message: 'Artículo creado',
            id: result.insertedId,
        }, 201);
    }
    catch (error) {
        console.error('Error al crear el artículo:', error);
        return c.json({
            message: 'Error creando el artículo',
        }, 500);
    }
};
