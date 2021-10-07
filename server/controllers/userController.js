const mongoose = require("mongoose");

const { NotFoundError } = require("../lib/errorHandlers");

const UserModel = mongoose.model("User");
const RecipeModel = mongoose.model("Recipe");
const ShoppingListModel = mongoose.model("ShoppingList");

/**
 * GET /api/v1/user/me
 * Retrive full user profile information.
 */
exports.getBasicProfile = (req, res) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
  });
};

/**
 * GET /api/v1/user/:id
 * Retrive user public profile/account information.
 */
exports.getOneUser = async (req, res) => {
  // TODO change routes and params with passport authorization
  const user = await UserModel.findOne({ _id: req.params.id })
    .select("-providers -favorites -shopping_lists")
    .populate("recipes");
  res.json({ message: "user public profile", user });
};

/**
 * PATCH /api/v1/user/:id/update
 * Update user.
 */
exports.updateOneUser = async (req, res) => {
  // TODO change routes and params with passport authorization
  const { id } = req.params;
  const user = await UserModel.findOneAndUpdate({ _id: id }, req.body, {
    runValidators: true,
    new: true,
  });
  res.json({ message: "Your profile information has been updated", user });
};

/**
 * DELETE /api/v1/user/:id/delete
 * Delete user.
 */
exports.deleteOneUser = async (req, res) => {
  // TODO change routes and params with passport authorization
  const { id: userID } = req.params;
  await RecipeModel.deleteMany({ author: userID });
  await ShoppingListModel.deleteMany({ author: userID });
  res.json({ message: "All your information has been deleted" });
};
