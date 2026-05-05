import { Router } from "express";
import { getGames } from "../utils/database";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", async (req, res) => {
  const games = await getGames();
  res.render("home", { games });
});

router.get("/collection", (req, res) => {
  res.render("collection");
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
