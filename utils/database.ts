import { Collection, MongoClient } from "mongodb";


import bcrypt from "bcrypt";

export const client = new MongoClient("mongodb+srv://matthiasmets_db_user:matthiasmets@webontwikkeling.rgcmiid.mongodb.net/?appName=WebOntwikkeling");

export interface User {
  email: string;
  password: string;
  collection?: number[]; // game IDs
}

export interface Games {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic?: number;

  platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];

  genres: {
    id: number;
    name: string;
  }[];
}


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
    await seed();
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

async function seed() {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=f261bf4dc1a84efeab97fb873bdedb9d&page=1`,
  );
  const data = await response.json();
  if ((await gameDataCollection.countDocuments()) === 0) {
    await gameDataCollection.insertMany(data.results);
  }
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


export async function seedDatabase() {
  await seedGames();
  await seedUsers();
}

async function seedGames() {
  const count = await gameDataCollection.countDocuments();

  if (count === 0) {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=f261bf4dc1a84efeab97fb873bdedb9d&page=1`,
    );

    const data = await response.json();
    await gameDataCollection.insertMany(data.results);

    console.log("Seeded games");
  }
}

async function seedUsers() {
  if (process.env.NODE_ENV === "production") return;

  const users = [
    {
      email: "test@test.com",
      password: "test123",
      collection: [3498, 4200, 3328],
    },
    {
      email: "admin@gmail.com",
      password: "admin",
      collection: [3498, 4200, 3328],
    },
  ];

  for (const user of users) {
    const exists = await userCollection.findOne({ email: user.email });

    if (!exists) {
      const hashed = await bcrypt.hash(user.password, 10);

      await userCollection.insertOne({
        email: user.email,
        password: hashed,
        collection: user.collection,
      });

      console.log(`Seeded user: ${user.email}`);
    }
  }
}
