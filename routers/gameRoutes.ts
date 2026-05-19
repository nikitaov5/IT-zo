import { Router } from "express";
import { gameDataCollection } from "../utils/database";
import { requireLogin } from "../middleware/requireLogin";

const router = Router();

router.get("/games/:id", requireLogin, async (req, res, next) => {
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
