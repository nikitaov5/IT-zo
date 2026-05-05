import { MongoClient } from "mongodb";

export const client = new MongoClient(
  "mongodb+srv://matthiasmets_db_user:matthiasmets@webontwikkeling.rgcmiid.mongodb.net/?appName=WebOntwikkeling",
);

export async function connectDB() {
  await client.connect();
  console.log("Connected to database");
}
