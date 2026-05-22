// database.ts
import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { User, Games } from "./database-interfaces";
import { seedDatabase } from "./seed";

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI is not defined in .env");
export const client = new MongoClient(uri);

export const gameDataCollection: Collection<Games> = client
  .db("GameHubData")
  .collection<Games>("GameHubData");

export const userCollection: Collection<User> = client
  .db("GameHubData")
  .collection<User>("userCollection");

async function exit() {
  try {
    await client.close();
    console.log("Disconnected from database");
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
}

export async function connect() {
  try {
    await client.connect();
    console.log("Connected to database");

    await gameDataCollection.createIndex({
      name: "text",
    });

    await seedDatabase();

    console.log("seeded database");

    process.on("SIGINT", exit);
  } catch (error) {
    console.error(error);
  }
}

export async function getGames(page: number) {
  const limit = 24;
  const skip = (page - 1) * limit;
  return await gameDataCollection.find().skip(skip).limit(limit).toArray();
}

export async function createUser(email: string, password: string) {
  const existingUser = await userCollection.findOne({ email });

  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userCollection.insertOne({
    email,
    password: hashedPassword,
    collection: [],
  });
}

export async function loginUser(email: string, password: string) {
  const user = await userCollection.findOne({ email });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Wrong password");

  return user;
}
