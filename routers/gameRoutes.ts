import { Router } from "express";
import { gameDataCollection } from "../utils/database";
import { searchGames } from "../utils/database";
const router = Router();

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q as string;

    if (!query) {
      return res.json([]);
    }

    const games = await searchGames(query);

    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error searching games",
    });
  }
});


router.get("/games/:id", async (req, res, next) => {
  try {
    const game = await gameDataCollection.findOne({
      id: Number(req.params.id),
    });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(game);
  } catch (err: any) {
    next(err);
  }
});

export default router;
