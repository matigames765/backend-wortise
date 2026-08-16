import { Db, MongoClient } from 'mongodb';
const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error('MONGO_URI no está definida');
}
export const client = new MongoClient(uri);
export const db = client.db(process.env.MONGO_DB_NAME);
export const connectDB = async () => {
    await client.connect();
    console.log('MongoDB conectado');
};
export const getDB = () => db;
