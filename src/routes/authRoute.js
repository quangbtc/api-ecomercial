import express from "express";
import User from "../models/User.js";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log(req.body)
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({
      err: 1,
      message: "Cannot register",
      info: error,
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(500).json("Wrong user!");
    }

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    if (OriginPassword !== req.body.password) {
      return res.status(500).json("Wrong password!");
    }
    const { password, ...others } = user._doc;
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.PASS_SEC,
      { expiresIn: "3d" }
    );
    return res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, //1 week
      })
      .status(201)
      .json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
