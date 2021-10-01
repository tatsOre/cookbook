const mongoose = require("mongoose");
const Recipe = mongoose.model("Recipe");

/**
 * GET /api/v1/recipes
 * Retrieve list of all recipe instances.
 */
exports.recipe_list = async (req, res) => {
  const recipes = await Recipe.find({ public: true }).select(
    "-ingredients -instructions"
  );

  res.json({ total: recipes.length, recipes });
};

/**
 * GET /api/v1/recipes/:id
 * Retrieve detail page for a specific recipe.
 */
exports.recipe_details = async (req, res) => {
  // todo: check if recipe is public, check recipe owner
  const recipe = await Recipe.findOne({ _id: req.params.id });
  res.json(recipe);
};

/**
 * POST /api/v1/recipes/:id
 * Create and save new recipe instance.
 */
exports.recipe_create = async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.json(recipe);
};

/**
 * PUT /api/v1/recipes/:id
 * Update a recipe instance.
 */
exports.recipe_update = async (req, res) => {
  const recipe = await Recipe.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  if (!recipe) throw Error("Not found");
  res.json(recipe);
};

/**
 * DELETE /api/v1/recipes/:id
 * Delete a recipe instance.
 */
exports.recipe_delete = async (req, res) => {
  const { id } = req.params;
  await Recipe.findByIdAndDelete({ _id: id });
  res.status(204).send();
};

// https://www.udemy.com/course/react-nextjs-firebase-nodejs-mongodb-authentication/
