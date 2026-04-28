import { Router } from "express";
import { gameDataCollection } from "../utils/database";

const router = Router();

router.get("/games/:id", async (req, res) => {
  console.log("bombo");
  const game = await gameDataCollection.findOne({
    id: Number(req.params.id),
  });

  res.json(game);
});

export default router;
