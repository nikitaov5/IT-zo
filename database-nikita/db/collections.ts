import { Collection } from "mongodb";
import { client } from "./client";
import { User } from "../models/User";
import { Games } from "../models/Game";

export const gameDataCollection: Collection<Games> = client
  .db("GameHubData")
  .collection<Games>("gameCollection");

export const userCollection: Collection<User> = client
  .db("GameHubData")
  .collection<User>("userCollection");
