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

app.get("/register", (req, res) => {
  res.render("register");
});

// Test voor unavailable page, later werken met redirect
app.get("/unavailable", (req, res) => {
  res.render("unavailable");
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port")),
);
