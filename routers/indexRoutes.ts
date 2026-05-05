import { Router } from "express";
import session from "express-session";
import { getGames, userCollection } from "../utils/database";

declare module "express-session" {
  interface SessionData {
    email?: string;
  }
}

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const games = await getGames(page);
  res.render("home", { games });
});

router.get("/collection", (req, res) => {
  res.render("collection");
});

router.post("/collection/add", async (req, res) => {
  const { gameId } = req.body;
  const email = req.session.email; 

  if (!email) return res.status(401).json({ error: "Niet ingelogd" });

  await userCollection.updateOne(
    { email },
    { $addToSet: { collection: gameId } } 
  );

  res.json({ success: true });
});

router.get("/compare", (req, res) => {
  res.render("compare");
});

router.get("/gtg", (req, res) => {
  res.render("gtg");
});

router.get("/unavailable", (req, res) => {
  res.render("unavailable");
});

export default router;
