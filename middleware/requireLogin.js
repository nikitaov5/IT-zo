"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireLogin = void 0;
const requireLogin = (req, res, next) => {
    if (!req.session.email) {
        return res.redirect("/login");
    }
    next();
};
exports.requireLogin = requireLogin;
