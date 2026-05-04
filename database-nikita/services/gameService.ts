import { gameDataCollection } from "../db/collections";

export async function getGames() {
  return await gameDataCollection.find().toArray();
}
