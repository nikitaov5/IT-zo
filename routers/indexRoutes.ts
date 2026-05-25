import { Router } from "express";
import {
  getGames,
  userCollection,
  gameDataCollection,
  addGameToCollection,
} from "../utils/database";

const router = Router();

declare module "express-session" {
  interface SessionData {
    email?: string;
  }
}

router.get("/", (req, res) => res.render("index"));
router.get("/compare", (req, res) => res.render("compare"));
router.get("/gtg", (req, res) => res.render("gtg"));
router.get("/unavailable", (req, res) => res.render("unavailable"));

router.get("/home", async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const games = await getGames(page);
    res.render("home", { games });
  } catch (err) {
    console.log(err);
  }
});

router.get("/collection", async (req, res, next) => {
  try {
    const email = req.session.email;

    if (!email) {
      return res.redirect("/login");
    }

    const user = await userCollection.findOne({ email });

    if (!user?.collection?.length) {
      return res.render("collection", { games: [] });
    }

    const games = await gameDataCollection
      .find({
        id: { $in: user.collection.map(Number) },
      })
      .toArray();

    res.render("collection", { games });
  } catch (err) {
    next(err);
  }
});

router.post("/collection/remove/:id", async (req, res) => {
  const userEmail = req.session.email;

  if (!userEmail) {
    return res.redirect("/login");
  }

  const gameId = Number(req.params.id);

  await userCollection.updateOne(
    { email: userEmail },
    {
      $pull: {
        collection: gameId,
      },
    },
  );

  res.json({
    success: true,
  });
});


//main page add collection knop
router.post("/collection/add", async (req, res) => {
  const { email, gameId } = req.body;

  try {
    await addGameToCollection(email, gameId);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Failed to add game" });
  }
});

export default router;
