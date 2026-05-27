import { Router } from "express";
import { createUser, loginUser } from "../utils/database";
import { error } from "node:console";
import { requireLogin } from "../middleware/requireLogin";

const router = Router();

router.get("/login", (req, res) => res.render("login"));

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    req.session.email = email;

    req.session.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Session error" });
      }

      console.log("Session after login:", req.session);

      res.json({
        message: "Login Success",
        user,
        redirect: "/",
      });
    });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.get("/register", (req, res) => res.render("register"));

router.post("/register", async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    await createUser(email, password);
    res.json({ message: "User created" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/logout", (req, res, next) => {
  try {
    req.session.destroy(() => {
      res.redirect("/")
    });
  } catch (err) {
    next(err);
  }
});

export default router;
