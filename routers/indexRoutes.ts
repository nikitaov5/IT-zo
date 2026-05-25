import { Router } from "express";
import {
  getGames,
  userCollection,
  gameDataCollection,
} from "../utils/database";
import { requireLogin } from "../middleware/requireLogin";

const router = Router();

declare module "express-session" {
  interface SessionData {
    email?: string;
  }
}

router.get("/", (req, res) => res.render("index"));
router.get("/compare", requireLogin, (req, res) => res.render("compare"));
router.get("/gtg", requireLogin, (req, res) => res.render("gtg"));
router.get("/unavailable", (req, res) => res.render("unavailable"));

router.get("/home", requireLogin, async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    console.log("PAGE:", page);
    const games = await getGames(page);

    if (req.xhr || (req.headers.accept && req.headers.accept.includes("application/json"))) {
      return res.json(games);
    }
    res.render("home", { games });
  } catch (err) {
    console.log(err);
  }
});

router.get("/home/search", requireLogin, async (req, res, next) => {
  try {
    const query = req.query.q as string;
    if (!query) return res.json([]);

    const games = await gameDataCollection
      .find({ name: { $regex: query, $options: "i" } })
      .limit(24)
      .toArray();

    res.json(games);
  } catch (err) {
    next(err);
  }
});

router.get("/home/current-game", requireLogin, async (req, res, next) => {
  try {
    const email = req.session.email;
    const user = await userCollection.findOne({ email });

    if (!user?.currentGame) return res.json(null);

    const game = await gameDataCollection.findOne({ id: user.currentGame });
    res.json(game);
  } catch (err) {
    next(err);
  }
});

router.post("/home/current-game", requireLogin, async (req, res, next) => {
  try {
    const { gameId } = req.body;
    const email = req.session.email;

    await userCollection.updateOne(
      { email },
      { $set: { currentGame: gameId } }
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});


router.get("/collection", requireLogin, async (req, res, next) => {
  try {
    const email = req.session.email;
    const sort = req.query.sort;

    if (!email) {
      return res.redirect("/login");
    }

    const user = await userCollection.findOne({ email });

    if (!user?.collection?.length) {
      return res.render("collection", { games: [], sort });
    }

    let sortOption = {};

    switch (sort) {
      case "rating":
        sortOption = { rating: -1 };
        break;

      case "ratingAsc":
        sortOption = { rating: 1 };
        break;

      case "name":
        sortOption = { name: 1 };
        break;

      case "released":
        sortOption = { released: -1 };
        break;

      default:
        sortOption = {};
    }

    const games = await gameDataCollection
      .find({
        id: { $in: user.collection.map(Number) },
      })
      .sort(sortOption)
      .toArray();

    res.render("collection", { games, sort });
  } catch (err) {
    next(err);
  }
});

router.post("/collection/remove/:id", requireLogin, async (req, res) => {
  const userEmail = req.session.email;

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

router.post("/collection/add", requireLogin, async (req, res, next) => {
  try {
    const { gameId } = req.body;
    const email = req.session.email;

    await userCollection.updateOne(
      { email },
      { $addToSet: { collection: gameId } },
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
