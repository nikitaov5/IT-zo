import express from "express";
import ejs from "ejs";
import path from "path";
import { MongoClient } from "mongodb";
// import {connect, gameDataCollection, getGames} from "./utils/database";
import { connect } from "./database-nikita/server";
import { gameDataCollection } from "./database-nikita/db/collections";
import { getGames } from "./database-nikita/services/gameService";
import { loginUser, createUser } from "./database-nikita/services/userService";

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
  const games = await getGames();
  res.render("home", { games });
});

app.get("/collection", (req, res) => {
  res.render("collection");
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
    const { email, password } = req.body;

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
