import type { Context } from "hono";
import { ObjectId } from "mongodb";
import type { z } from "zod";
import { getDB } from "../config/database.js";
import type { articleSchema } from "../schemas/articlesSchema.js";
import { auth } from "../auth/auth.js";

type ArticleBodyContext = Context<
  {},
  string,
  {
    out: {
      json: z.infer<typeof articleSchema>;
    };
  }
>;

export const postArticle = async (c: ArticleBodyContext) => {
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

    return c.json(
      {
        message: "Artículo creado",
        id: result.insertedId,
      },
      201,
    );
  } catch (error) {
    return c.json(
      {
        message: "Error creando el artículo",
      },
      500,
    );
  }
};

export const getAllArticles = async (c: Context) => {
  try {
    const db = getDB();

    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json({ message: "No autorizado" }, 401);
    }

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
  } catch (error) {
    if (error instanceof Error) {
      return c.json(
        {
          message: `Error al obtener todos los artículos: ${error.message}`,
        },
        500,
      );
    }
  }
};

export const getArticleCountByAuthor = async (c: Context) => {
  try {
    const db = getDB();

    const articlesByAuthor = await db
      .collection("articles")
      .aggregate([
        {
          $group: {
            _id: "$authorName",
            totalArticles: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            authorName: "$_id",
            totalArticles: 1,
          },
        },
        {
          $sort: {
            totalArticles: -1,
            authorName: 1,
          },
        },
      ])
      .toArray();

    return c.json(articlesByAuthor);
  } catch (error) {
    return c.json(
      {
        message: "Error al obtener la cantidad de artículos por autor",
      },
      500,
    );
  }
};

export const getArticleFilter = async (c: Context) => {
  try {
    const filter = c.req.param("filter")?.trim();

    if (!filter) {
      return c.json({ message: "El filtro es obligatorio" }, 400);
    }

    const escapedFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const filterRegex = new RegExp(`^${escapedFilter}`, "i");

    const db = getDB();
    const articles = await db
      .collection("articles")
      .find({
        $or: [
          { title: filterRegex },
          { content: filterRegex },
          { authorName: filterRegex },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray();

    return c.json(articles);
  } catch (error) {
    return c.json(
      {
        message: "Error al filtrar los artículos",
      },
      500,
    );
  }
};

export const updateArticle = async (c: ArticleBodyContext) => {
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
    const result = await db.collection("articles").updateOne(
      {
        _id: new ObjectId(id),
        userId: session.user.id,
      },
      {
        $set: {
          title: data.title,
          content: data.content,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return c.json({ message: "Artículo no encontrado" }, 404);
    }

    return c.json({ message: "Artículo actualizado" });
  } catch (error) {
    return c.json({ message: "Error actualizando el artículo" }, 500);
  }
};

export const deleteArticle = async (c: Context) => {
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
  } catch (error) {
    return c.json({ message: "Error eliminando el artículo" }, 500);
  }
};
