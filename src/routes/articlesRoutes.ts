import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { getAllArticles, postArticle } from '../controllers/articleController.js'
import { articleSchema } from '../schemas/articlesSchema.js'

const articlesRoutes = new Hono()

articlesRoutes.post('/', zValidator('json', articleSchema), postArticle)

articlesRoutes.get('/', getAllArticles)

articlesRoutes.put('/')

articlesRoutes.delete('/')

export default articlesRoutes
