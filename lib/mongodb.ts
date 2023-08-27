/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-underscore-dangle */
import { MongoClient } from 'mongodb';

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const client = new MongoClient(process.env.MONGO_URI);
const database = client.db(process.env.MONGO_DATABASE);

export default database;
