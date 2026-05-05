import bcrypt from "bcrypt";
import { userCollection } from "../db/collections";

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
