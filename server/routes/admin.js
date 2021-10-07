const router = require("express").Router();

const mongoose = require("mongoose");

const RecipeModel = mongoose.model("Recipe");
const ShoppingListModel = mongoose.model("ShoppingList");
const UserModel = mongoose.model("User");

// TODO: Create Auth system for admin role
/**
 * GET /admin/users
 * Retrive all users.
 */
router.get("/users", async (req, res, next) => {
  const users = await UserModel.find().populate("recipes");
  res.json({ total: users.length, users });
});

/**
 * GET /admin/user/:id
 * Retrive user public profile/account information.
 */
exports.getOneUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id });
  res.json(user);
};

/**
 * PATCH /admin/user/:id/update
 * Update user.
 */
exports.updateOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findOneAndUpdate({ _id: id }, req.body, {
    runValidators: true,
    new: true,
  });
  res.json({ message: "successfully updated", user });
};

/**
 * DELETE /admin/user/:id/delete
 * Delete user.
 */
exports.deleteOneUser = async (req, res) => {
  const { id } = req.params;
  await RecipeModel.deleteMany({ author: id });
  await ShoppingListModel.deleteMany({ author: id });
  await UserModel.deleteOne({ _id: id });
  res.json({ message: "successfully deleted" });
};

module.exports = router;
