import { Router } from "express";
import { gameDataCollection } from "../utils/database";

const router = Router();

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
