import type { Context } from "hono";
import type { z } from "zod";
import { getDB } from "../config/database.js";
import type { articleSchema } from "../schemas/articlesSchema.js";
import { auth } from "../auth/auth.js";

type PostArticleContext = Context<
  {},
  string,
  {
    out: {
      json: z.infer<typeof articleSchema>;
    };
  }
>;

export const postArticle = async (c: PostArticleContext) => {
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

    const articles = await db
      .collection("articles")
      .find({})
      .toArray();

    return c.json(articles);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({
        message: `Error al obtener todos los artículos: ${error.message}`,
      });
    }
  }
};
