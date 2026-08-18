import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import {
  deleteArticle,
  getAllArticles,
  getArticleCountByAuthor,
  getArticleFilter,
  postArticle,
  updateArticle
} from '../controllers/articleController.js'
import { articleSchema } from '../schemas/articlesSchema.js'

const articlesRoutes = new Hono()

articlesRoutes.post('/', zValidator('json', articleSchema), postArticle)

articlesRoutes.get('/', getAllArticles)

articlesRoutes.get('/filter/:filter', getArticleFilter)

articlesRoutes.get('/authors/count', getArticleCountByAuthor)

articlesRoutes.put('/:id', zValidator('json', articleSchema), updateArticle)

articlesRoutes.delete('/:id', deleteArticle)

export default articlesRoutes
