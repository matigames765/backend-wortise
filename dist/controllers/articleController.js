import { ObjectId } from "mongodb";
import { getDB } from "../config/database.js";
import { auth } from "../auth/auth.js";
export const postArticle = async (c) => {
    try {
        const db = getDB();
        const data = c.req.valid("json");
        const session = await auth.api.getSession({
            headers: c.req.raw.headers,
        });
        if (!session) {
            return c.json({ message: "No autorizado" }, 401);
        }
        const result = await db.collection("articles").insertOne({
            title: data.title,
            content: data.content,
            authorName: session.user.name,
            userId: session.user.id,
            createdAt: new Date(),
        });
        return c.json({
            message: "Artículo creado",
            id: result.insertedId,
        }, 201);
    }
    catch (error) {
        return c.json({
            message: "Error creando el artículo",
        }, 500);
    }
};
export const getAllArticles = async (c) => {
    try {
        const db = getDB();
        const page = Number(c.req.query("page")) || 1;
        const limit = Number(c.req.query("limit")) || 10;
        const skip = (page - 1) * limit;
        const articlesCollection = db.collection("articles");
        const [articles, totalArticles] = await Promise.all([
            articlesCollection
                .find({})
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .toArray(),
            articlesCollection.countDocuments(),
        ]);
        const totalPages = Math.ceil(totalArticles / limit);
        return c.json({
            articles,
            pagination: {
                page,
                limit,
                totalArticles,
                totalPages,
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return c.json({
                message: `Error al obtener todos los artículos: ${error.message}`,
            }, 500);
        }
    }
};
export const updateArticle = async (c) => {
    try {
        const id = c.req.param("id");
        if (!id || !ObjectId.isValid(id)) {
            return c.json({ message: "ID de artículo inválido" }, 400);
        }
        const session = await auth.api.getSession({
            headers: c.req.raw.headers,
        });
        if (!session) {
            return c.json({ message: "No autorizado" }, 401);
        }
        const data = c.req.valid("json");
        const db = getDB();
        const result = await db.collection("articles").updateOne({
            _id: new ObjectId(id),
            userId: session.user.id,
        }, {
            $set: {
                title: data.title,
                content: data.content,
                updatedAt: new Date(),
            },
        });
        if (result.matchedCount === 0) {
            return c.json({ message: "Artículo no encontrado" }, 404);
        }
        return c.json({ message: "Artículo actualizado" });
    }
    catch (error) {
        return c.json({ message: "Error actualizando el artículo" }, 500);
    }
};
export const deleteArticle = async (c) => {
    try {
        const id = c.req.param("id");
        if (!id || !ObjectId.isValid(id)) {
            return c.json({ message: "ID de artículo inválido" }, 400);
        }
        const session = await auth.api.getSession({
            headers: c.req.raw.headers,
        });
        if (!session) {
            return c.json({ message: "No autorizado" }, 401);
        }
        const db = getDB();
        const result = await db.collection("articles").deleteOne({
            _id: new ObjectId(id),
            userId: session.user.id,
        });
        if (result.deletedCount === 0) {
            return c.json({ message: "Artículo no encontrado" }, 404);
        }
        return c.json({ message: "Artículo eliminado" });
    }
    catch (error) {
        return c.json({ message: "Error eliminando el artículo" }, 500);
    }
};
