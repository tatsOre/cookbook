const mongoose = require("mongoose");

const UserModel = mongoose.model("User");
const RecipeModel = mongoose.model("Recipe");

const { NotFoundError } = require("../lib/errorHandlers");

/**
 * GET /api/v1/recipes
 * Retrieve the list of all public recipe items with optional pagination.
 */
exports.getRecipes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = page * limit - limit;

  const recipesPromise = RecipeModel.find({ public: true })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: "desc" });

  const countPromise = RecipeModel.find({ public: true }).count();

  const [recipes, count] = await Promise.all([recipesPromise, countPromise]);

  const totalPages = Math.ceil(count / limit);

  res.json({ total: count, pages: totalPages, page, recipes });
};

/**
 * GET /api/v1/recipes/sort?:key=:value
 * Sort public recipes by query (category|cuisine).
 */
exports.getRecipesByQuery = async (req, res) => {
  const { field, value } = req.query;
  const query = new RegExp(value, "gi");
  const recipes = await RecipeModel.find({
    public: true,
    [field]: query,
  });
  res.json({ total: recipes.length, recipes });
};

/**
 * GET /api/v1/recipes/latest
 */
exports.getLatestRecipes = async (req, res) => {
  const recipes = await RecipeModel.find({ public: true })
    .limit(6)
    .sort({ updatedAt: "desc" });

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
 * POST /api/v1/recipe
 */
exports.addOneRecipe = async (req, res) => {
  req.body.author = req.user._id;
  const recipe = await RecipeModel.create({ ...req.body });

  await UserModel.findByIdAndUpdate(req.user._id, {
    $addToSet: { recipes: recipe._id },
  });

  res.json(recipe);
};

/**
 * PATCH /api/v1/recipe/:id
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
 * DELETE /api/v1/recipe/:id
 */
exports.deleteOneRecipe = async (req, res) => {
  const { id } = req.params;

  await UserModel.findByIdAndUpdate(req.user._id, {
    $pull: { recipes: id },
  });
  await RecipeModel.findByIdAndDelete({ _id: id });

  res.status(204).send();
};

/**
 * GET /api/v1/recipes/search?q=[query]
 */
exports.searchRecipes = async (req, res) => {
  // todo: implement partial search
  const recipes = await RecipeModel.find(
    {
      public: true,
      $text: { $search: req.query.q },
    },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(5);

  res.json(recipes);
  /*
    const searchRegex = new RegExp(req.query.q);
  console.log(searchRegex);

  const x = await RecipeModel.find({
    title: { $regex: searchRegex, $options: "i" },
  });

  */
};
