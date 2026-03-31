import express from "express";
import ejs from "ejs";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port")),
);
