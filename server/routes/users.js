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
  passport.authenticate("jwt", { session: false }), // ESTO SE DEBE TENER PRESENTE PARA TODAS LAS SECURED ROUTES
  (req, res, next) => {
    res.json({
      message: "You made it to the secure route",
      user: req.user,
      token: req.query.secret_token,
    });
  }
);

module.exports = router;
