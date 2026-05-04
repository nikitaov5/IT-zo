import { MongoClient } from "mongodb";

export const client = new MongoClient("mongodb://localhost:27017");

export async function connectDB() {
  await client.connect();
  console.log("Connected to database");
}
