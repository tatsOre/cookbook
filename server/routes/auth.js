const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

const UserModel = require("../models/User");
const {
  catchErrors,
  DuplicateKeyError,
  NotFoundError,
} = require("../lib/errorHandlers");

router.get("/", (req, res, next) => {
  res.send("Hello world");
});

router.post(
  "/register",
  catchErrors(async (req, res) => {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user) throw new DuplicateKeyError("User already exists");

    user = await UserModel.create({ email, password });
    res.json({
      message: "Signup successful",
      user,
    });
  })
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) throw new NotFoundError("User not found");

  const validate = await user.isValidPassword(password);
  if (!validate) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const body = { _id: user._id, email: user.email };
  const expiresIn = "7d";
  const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn });

  return res.json({
    message: "Logged in Successfully",
    user,
    token,
    expiresIn,
  });
});

module.exports = router;
