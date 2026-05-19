import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import session from "express-session";
import { connect } from "./utils/database";
import indexRouter from "./routers/indexRoutes";
import gameRoutes from "./routers/gameRoutes";
import authRouter from "./routers/authRoutes";
import { requireLogin } from "./middleware/requireLogin";

declare module "express-session" {
  interface SessionData {
    email?: string;
  }
}

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
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    },
  }),
);

app.use("/", indexRouter);
app.use("/", gameRoutes);
app.use("/", authRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};
app.use(errorHandler);

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
