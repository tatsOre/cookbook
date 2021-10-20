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
 * Retrieve user public profile/account information.
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
 * GET /api/v1/me/recipes
 * Retrieve user recipes.
 */
exports.getUserRecipes = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user._id })
    .select("recipes")
    .populate("recipes");

  return res.json(user);
};

/**
 * GET /api/v1/me/favorites
 * Retrieve user favorites.
 */
exports.getFavorites = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user._id })
    .select("favorites")
    .populate("favorites");

  return res.json(user);
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

/**
 * GET /api/v1/me/search?field=:field&q=:queryParam
 * field: [recipes || favorites]
 */
exports.searchUserRecipes = async (req, res) => {
  const { field, q } = req.query;

  const user = await UserModel.findOne({
    _id: req.user._id,
  }).populate({
    path: field,
    select: "-author",
    match: {
      $or: [
        { title: new RegExp(q, "gi") },
        { categories: new RegExp(q, "gi") },
        { cuisine: new RegExp(q, "gi") },
      ],
    },
  });

  res.json(user[field]);
};
