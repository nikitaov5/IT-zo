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

app.use("/", indexRouter);
app.use("/games", gameRoutes);

app.listen(app.get("port"), async () => {
  await connect();
  console.log("[server] http://localhost:" + app.get("port"));
});
