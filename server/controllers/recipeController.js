const mongoose = require("mongoose");

const RecipeModel = mongoose.model("Recipe");

const { NotFoundError } = require("../lib/errorHandlers");
const UserModel = require("../models/User");

/**
 * GET /api/v1/recipes
 * Retrieve the list of all public recipe items.
 */
exports.getRecipes = async (req, res) => {
  const recipes = await RecipeModel.find({ public: true });
  res.json({ total: recipes.length, recipes });
};

/**
 * GET /api/v1/recipe/:id
 */
exports.getOneRecipe = async (req, res) => {
  // todo: check if recipe is public, check recipe owner
  const recipe = await RecipeModel.findOne({ _id: req.params.id });
  res.json(recipe);
};

/**
 * POST /api/v1/recipe/create
 */
exports.addOneRecipe = async (req, res) => {
  const recipe = await RecipeModel.create({ ...req.body });
  res.json(recipe);
};

/**
 * PATCH /api/v1/recipe/:id/update
 */
exports.updateOneRecipe = async (req, res) => {
  const recipe = await RecipeModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  if (!recipe) throw NotFoundError("Document not found");
  res.json(recipe);
};

/**
 * DELETE /api/v1/recipe/:id/delete
 */
exports.deleteOneRecipe = async (req, res) => {
  const { id } = req.params;
  await RecipeModel.findByIdAndDelete({ _id: id });
  res.status(204).send();
};

/**
 * GET /api/v1/recipes/search?q=[query]
 */
exports.searchRecipes = async (req, res) => {
  const recipes = await RecipeModel.find(
    {
      public: true,
      $text: { $search: req.query.q },
    },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(10);

  res.json(recipes);
  /*
    const searchRegex = new RegExp(req.query.q);
  console.log(searchRegex);

  const x = await RecipeModel.find({
    title: { $regex: searchRegex, $options: "i" },
  });

  */
};
