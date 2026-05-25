import { gameDataCollection, userCollection } from "./database";
import bcrypt from "bcrypt";

const API_KEY = process.env.RAWG_API_KEY;

async function fetchScreenshots(gameId: number) {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${gameId}/screenshots?key=${API_KEY}`,
    );
    const data = await res.json();
    return data.results ?? [];
  } catch (error) {
    console.error(`Failed to fetch screenshots for game ${gameId}:`, error);
    return [];
  }
}

export async function seedDatabase() {
  await seedGames();
  await seedUsers();
}

async function seedGames() {
  const count = await gameDataCollection.countDocuments();

  if (count > 0) {
    console.log("Games zijn al geseed, skip.");
    return;
  }

  console.log("Games worden geseed...");

  const MAX_GAMES = 240;
  const allGames: any[] = [];
  const RAWG_API_KEY = process.env.RAWG_API_KEY;
  let url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&ordering=release&page_size=20`

  while (url && allGames.length < MAX_GAMES) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.results) {
      allGames.push(...data.results);
      console.log(`Geladen: ${allGames.length} games...`);
    }
    url = data.next ?? null; //als er geen volgende pagina is
  }

  const gamesWithScreenshots = await Promise.all(
    allGames.map(async (game) => {
      const screenshots = await fetchScreenshots(game.id);
      return { ...game, screenshots };
    }),
  );

  await gameDataCollection.insertMany(gamesWithScreenshots);
  console.log(`Seeded ${gamesWithScreenshots.length} games with screenshots`);
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
      collection: [3498, 12020, 3328],
    },
    {
      email: "nikita@gmail.com",
      password: "nikita",
      collection: [3498, 12020, 3328],
    },
    {
      email: "manycol@gmail.com",
      password: "admin",
      collection: [3498, 12020, 3328, 11859, 13537, 5286, 28, 4062, 32, 58175],
    },
    {
      email: "biguser@gmail.com",
      password: "admin",
      collection: [3498, 12020, 3328, 11859, 13537, 5286, 28, 4062, 32, 58175],
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
