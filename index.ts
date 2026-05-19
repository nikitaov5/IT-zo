import express, { NextFunction } from "express";
import session from "express-session";
import ejs from "ejs";
import path from "path";
import { MongoClient } from "mongodb";
import {
  connect,
  createUser,
  gameDataCollection,
  getGames,
  loginUser,
  userCollection,
} from "./utils/database";
import indexRouter from "./routers/indexRoutes";
import gameRoutes from "./routers/gameRoutes";
import authRouter from "./routers/authRoutes";
import cookieParser from "cookie-parser";

const app = express();

app.set("port", process.env.PORT ?? 1000);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/", indexRouter);
app.use("/", gameRoutes);
app.use("/", authRouter);

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err);
//   res.status(500).json({ message: "Internal server error" });
// });

(async () => {
  try {
    await connect();
    app.listen(app.get("port"), () => {
      console.log("[server] http://localhost:" + app.get("port"));
    });
  } catch (error) {
    console.error("[server] Failed to connect to database:", error);
    process.exit(1);
  }
})();
