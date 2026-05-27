import { Request, Response, NextFunction } from "express";

export const requireLogin = (req: Request, res: Response, next: NextFunction,) => {
  console.log("Session in middleware:", req.session);
  console.log("Email:", req.session.email);
  if (!req.session.email) {
    return res.redirect("/login");
  }
  next();
};
