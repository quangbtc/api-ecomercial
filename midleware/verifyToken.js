import jwt from "jsonwebtoken";
import { createError } from "../src/util/errorMessage.js";
export const verifyToken = (req, res, next) => {
  const authHeader = req.cookies.access_token;
  if (!authHeader) {
    return next(createError(500, "Token not valid"));
  } else {
    jwt.sign(authHeader, process.env.PASS_SEC, (err, user) => {
      if (err) res.status(500).json("You are not alow!");
      req.user = user;
      next();
    });
  }
};
export const verifyTokenAndAuthorizes = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(500).json("You are now allow!");
    }
  });
};
