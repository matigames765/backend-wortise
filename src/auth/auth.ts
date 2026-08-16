import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import 'dotenv/config'

import { db, client } from '../config/database.js'

export const auth = betterAuth({
  baseURL: process.env.API_URL,

  database: mongodbAdapter(db, {
    client,
    transaction: false,
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },

  trustedOrigins: [
    process.env.FRONTEND_URL!,
  ],
})
