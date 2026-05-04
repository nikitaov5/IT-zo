import bcrypt from "bcrypt";
import { userCollection, gameDataCollection } from "./collections";

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
    { email: "test@test.com", password: "test123" },
    { email: "admin@gmail.com", password: "admin" },
  ];

  for (const user of users) {
    const exists = await userCollection.findOne({ email: user.email });

    if (!exists) {
      const hashed = await bcrypt.hash(user.password, 10);

      await userCollection.insertOne({
        email: user.email,
        password: hashed,
      });

      console.log(`Seeded user: ${user.email}`);
    }
  }
}
