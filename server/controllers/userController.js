const mongoose = require("mongoose");

const UserModel = mongoose.model("User");
const RecipeModel = mongoose.model("Recipe");
const ShoppingListModel = mongoose.model("ShoppingList");

/**
 * GET /api/v1/me
 * Retrive full user profile information.
 */
exports.getCurrentUser = (req, res) => {
  res.json(req.user);
};

/**
 * GET /api/v1/user/:id
 * Retrive user public profile/account information.
 */
exports.getOneUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id })
    .select("-providers -favorites -shopping_lists")
    .populate("recipes"); // change to public recipes
  res.json(user);
};

/** // TODO change route to /api/v1/me/update
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

/** TODO change route to /api/v1/me/delete
 * DELETE /api/v1/user/:id/delete
 * Delete user.
 */
exports.deleteOneUser = async (req, res) => {
  // TODO change routes and params with passport authorization
  const { id: userID } = req.params;
  await RecipeModel.deleteMany({ author: userID });
  await ShoppingListModel.deleteMany({ author: userID });
  await UserModel.deleteOne({ _id: id });
  res.json({ message: "All your information has been deleted" });
};

/**
 * POST /api/v1/me/favorites
 * Add/Remove a recipe to/from user favorites.
 */
exports.updateFavorites = async (req, res) => {
  const favorites = req.user.favorites.map((obj) => obj.toString());
  const operator = favorites.includes(req.body.recipe) ? "$pull" : "$addToSet";
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    { [operator]: { favorites: req.body.recipe } },
    { new: true }
  );
  return res.json(user);
};
