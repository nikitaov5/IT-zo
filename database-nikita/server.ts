import { connectDB } from "./db/client";
import { seedDatabase } from "./db/seed";

export async function connect() {
  await connectDB();
  await seedDatabase();
}
