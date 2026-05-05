import express from "express";
import ejs from "ejs";
import path from "path";
import { MongoClient } from "mongodb";
// import {connect, gameDataCollection, getGames} from "./utils/database";
import {
  userCollection,
} from "./database-nikita/db/collections";
import { loginUser, createUser } from "./database-nikita/services/userService";
import { connect, gameDataCollection, getGames } from "./utils/database";
import indexRouter from "./routers/indexRoutes";
import gameRoutes from "./routers/gameRoutes";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const games = await getGames(page);
  res.render("home", {games});
});

app.get("/collection", async (req, res) => {
  const user = await userCollection.findOne({
    email: "test@test.com",
  });

  if (!user || !user.collection) {
    return res.render("collection", { games: [] });
  }

  const games = await gameDataCollection
    .find({ id: { $in: user.collection } })
    .toArray();

  res.render("collection", { games });
});

app.get("/compare", (req, res) => {
  res.render("compare");
});

app.get("/gtg", (req, res) => {
  res.render("gtg");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);
    res.json({ message: "Login success", user });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    await createUser(email, password);

    res.json({ message: "User created" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Test voor unavailable page, later werken met redirect
app.get("/unavailable", (req, res) => {
  res.render("unavailable");
});

app.get("/:id", async (req, res) => {
  const game = await gameDataCollection.findOne({ id: Number(req.params.id) });
  res.json(game);
});

app.listen(app.get("port"), async () => {
  await connect();
  console.log("[server] http://localhost:" + app.get("port"));
});
