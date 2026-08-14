import { Db, MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI

if (!uri) {
  throw new Error('MONGO_URI no está definida')
}

const client = new MongoClient(uri)

let db: Db

export const connectDB = async () => {
  await client.connect()

  db = client.db(process.env.MONGO_DB_NAME)

  console.log('MongoDB conectado')
}

export const getDB = () => {
  if (!db) {
    throw new Error('La base de datos todavía no fue inicializada')
  }

  return db
}