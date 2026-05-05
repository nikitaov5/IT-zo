import { gameDataCollection } from "../db/collections";

export async function getGames(page: number) {
  return await gameDataCollection.find().toArray();
}
