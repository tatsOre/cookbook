const express = require("express");
const passport = require("passport");
const router = express.Router();

const UserModel = require("../models/User");

router.get("/", async (req, res, next) => {
  const users = await UserModel.find({}).select("-password");
  res.json({ total: users.length, users });
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      message: "You made it to the secure route",
      user: req.user,
      token: req.get("Authorization"),
    });
  }
);

module.exports = router;
