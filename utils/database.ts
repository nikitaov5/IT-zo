import { Collection, MongoClient } from "mongodb";


import bcrypt from "bcrypt";
import { User, Games } from "./database-interfaces";
import { seedUsers, seed } from "./seed";

export const client = new MongoClient("mongodb+srv://matthiasmets_db_user:matthiasmets@webontwikkeling.rgcmiid.mongodb.net/?appName=WebOntwikkeling");


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
    await seed();
    console.log("seeded database")
    process.on("SIGINT", exit);
  } catch (error) {
    console.error(error);
  }
}

export const gameDataCollection: Collection<Games> = client
  .db("GameHubData")
  .collection<Games>("GameHubData");
export async function getGames(page: number) {
  return await gameDataCollection.find().toArray();
}



export async function createUser(email: string, password: string) {
  const existingUser = await userCollection.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await userCollection.insertOne({
    email,
    password: hashedPassword,
  });
}

export async function loginUser(email: string, password: string) {
  const user = await userCollection.findOne({ email });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Wrong password");

  return user;
}

export async function addGameToCollection(email: string, gameId: number) {
  return await userCollection.updateOne(
    { email },
    { $addToSet: { collection: gameId } }
  );
}

export const userCollection: Collection<User> = client
  .db("GameHubData")
  .collection<User>("userCollection");



