import { Router } from "express";
import { gameDataCollection, userCollection } from "../utils/database";
import { requireLogin } from "../middleware/requireLogin";

const router = Router();

router.get("/compare/random", requireLogin, async (req, res, next) => {
  try {
    const games = await gameDataCollection
      .aggregate([{ $sample: { size: 2 } }])
      .toArray();
    res.json(games);
  } catch (err) {
    next(err);
  }
});

router.get("/compare/search", requireLogin, async (req, res, next) => {
  try {
    const query = req.query.q as string;
    if (!query) return res.json([]);

    const games = await gameDataCollection
      .find({ name: { $regex: query, $options: "i" } })
      .limit(10)
      .toArray();
    res.json(games);
  } catch (err) {
    next(err);
  }
});

router.get("/gtg/score", requireLogin, async (req, res, next) => {
  try {
    const user = await userCollection.findOne({ email: req.session.email });
    res.json({ score: user?.gtgScore ?? 0 });
  } catch (error) {
    next(error);
  }
});

router.post("/gtg/score", requireLogin, async (req, res, next) => {
  try {
    const { score } = req.body;
    await userCollection.updateOne(
      { email: req.session.email },
      { $set: { gtgScore: score } },
    );
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/gtg/random", requireLogin, async (req, res, next) => {
  try {
    const games = await gameDataCollection
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();
    res.json(games[0]);
  } catch (err) {
    next(err);
  }
});

router.get("/gtg/search", requireLogin, async (req, res, next) => {
  try {
    const query = req.query.q as string;
    if (!query) return res.json([]);

    const games = await gameDataCollection
      .find(
        { name: { $regex: query, $options: "i" } },
        { projection: { name: 1 } },
      )
      .limit(10)
      .toArray();

    res.json(games);
  } catch (err) {
    next(err);
  }
});

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
