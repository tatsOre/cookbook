const mongoose = require("mongoose");

const RecipeModel = mongoose.model("Recipe");

const { NotFoundError } = require("../lib/errorHandlers");

/**
 * GET /api/v1/recipes
 * Retrieve the list of all public recipe items.
 */
exports.getRecipes = async (req, res) => {
  const recipes = await RecipeModel.find({ public: true }).select(
    "-ingredients -instructions"
  );
  res.json({ total: recipes.length, recipes });
};

/**
 * GET /api/v1/recipe/:id
 * Add new recipe item.
 */
exports.getOneRecipe = async (req, res) => {
  // todo: check if recipe is public, check recipe owner
  const recipe = await RecipeModel.findOne({ _id: req.params.id });
  res.json(recipe);
};

/**
 * POST /api/v1/recipe/create
 * Add new recipe item.
 */
exports.addOneRecipe = async (req, res) => {
  const recipe = await RecipeModel.create({ ...req.body });
  res.json(recipe);
};

/**
 * PATCH /api/v1/recipe/:id/update
 * Update recipe item with ID :id.
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
 * Delete a recipe instance.
 */
exports.deleteOneRecipe = async (req, res) => {
  const { id } = req.params;
  await RecipeModel.findByIdAndDelete({ _id: id });
  res.status(204).send();
};
