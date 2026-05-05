import express from "express";
import ejs from "ejs";
import path from "path";
import { MongoClient } from "mongodb";
import { connect, gameDataCollection, getGames } from "./utils/database";
import indexRouter from "./routers/indexRoutes";
import gameRoutes from "./routers/gameRoutes";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const games = await getGames(page);
  res.render("home", {games});
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
