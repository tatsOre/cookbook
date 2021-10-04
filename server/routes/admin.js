const router = require("express").Router();

const mongoose = require("mongoose");

const UserModel = mongoose.model("User");

/**
 * GET /api/v1/users
 * Retrive all users.
 */
router.get("/users", async (req, res, next) => {
  const users = await UserModel.find().populate("recipes");
  res.json({ total: users.length, users });
});

module.exports = router;
