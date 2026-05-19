import { Router } from "express";
import { gameDataCollection } from "../utils/database";
import { requireLogin } from "../middleware/requireLogin";

const router = Router();

<<<<<<< HEAD
router.get("/games/:id", requireLogin, async (req, res, next) => {
=======


router.get("/games/:id", async (req, res, next) => {
>>>>>>> 9593ff82a0b7ba94a2f105811a31aaf0a3f2bff5
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
