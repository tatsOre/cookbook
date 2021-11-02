const passport = require("passport");
const router = require("express").Router();

const { catchErrors } = require("../lib/errorHandlers");

/*
  Index
*/

router.get("/", (req, res) => {
  res.json({ message: "Welcome to CookBook App" });
});

/*
  Routes for User Controller
*/
const userController = require("../controllers/userController");

/**
 * GET /api/v1/user/me
 * Retrieve user profile information.
 */
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  userController.getCurrentUser
);

/**
 * GET /api/v1/me/recipes
 * Retrieve user recipes.
 */
router.get(
  "/me/recipes",
  passport.authenticate("jwt", { session: false }),
  catchErrors(userController.getUserRecipes)
);

/**
 * GET /api/v1/me/favorites
 * Retrieve user favorites.
 */
router.get(
  "/me/favorites",
  passport.authenticate("jwt", { session: false }),
  catchErrors(userController.getFavorites)
);

/**
 * POST /api/v1/me/favorites
 * Add/Remove a recipe to/from user favorites.
 */
router.post(
  "/me/favorites",
  passport.authenticate("jwt", { session: false }),
  catchErrors(userController.updateFavorites)
);

/**
 * GET /api/v1/me/search?field=:field&q=:queryParam
 * EX: http://localhost:3000/api/v1/me/search?field=recipes&q=pasta
 */
router.get(
  "/me/search",
  passport.authenticate("jwt", { session: false }),
  catchErrors(userController.searchUserRecipes)
);

/**
 * GET /api/v1/user/:id
 * Retrieve user public profile information.
 */
router.get("/user/:id", catchErrors(userController.getOneUser));

/**
 * PATCH /api/v1/user/:id
 * Update user.
 */
router.patch("/user/:id", catchErrors(userController.updateOneUser));

/**
 * DELETE /api/v1/user/:id
 * Delete user.
 */
router.delete("/user/:id", catchErrors(userController.deleteOneUser));

/*
  Routes for Register and Auth Users Controller
*/
const authController = require("../controllers/authController");

/**
 * POST /api/v1/auth/register
 * Add/Register new user with local signup.
 */
router.post(
  "/auth/register",
  catchErrors(authController.confirmPasswords),
  catchErrors(authController.registerUser),
  catchErrors(authController.login),
  authController.setJWTcookie
);

/**
 * POST /api/v1/auth/login
 * Login a user - local login. Set JWT Cookie and send user main info.
 */
router.post(
  "/auth/login",
  catchErrors(authController.login),
  authController.setJWTcookie
);

/**
 * GET /api/v1/auth/logout
 * Removes JWT Cookie and logout the user.
 */
router.get("/auth/logout", catchErrors(authController.logout));

/**
 * GET /api/v1/auth/google
 * Authenticate Google Users and retrieve their profile and email address.
 */
router.use(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * GET /api/v1/auth/google_redirect
 * Register|Find Google Users. Set JWT Cookie and send user main info.
 */
const REDIRECT =
  process.env.NODE_ENV !== "development"
    ? process.env.CLIENT_ADDRESS
    : "http://localhost:3001";

router.get(
  "/auth/google_redirect",
  passport.authenticate("google", {
    assignProperty: "googleUser",
    failureRedirect: `${REDIRECT}/login`, // Todo: change to client address
  }),
  authController.registerGoogleUser
);

/*
  Routes for Recipes Controller
*/
const recipeController = require("../controllers/recipeController");

/**
 * GET /api/v1/recipes
 * Retrieve the list of all public recipe items with optional pagination.
 * EX: http://localhost:3000/api/v1/recipes?page=2&limit=2
 */
router.get("/recipes", catchErrors(recipeController.getRecipes));

/**
 * GET /api/v1/recipes/sort?:query
 * Sort public recipes by query (category|cuisine).
 */
router.get("/recipes/sort", catchErrors(recipeController.getRecipesByQuery));

/**
 * GET /api/v1/recipes/latest
 */
router.get("/recipes/latest", catchErrors(recipeController.getLatestRecipes));

/**
 * GET /api/v1/recipe/:id
 */
router.get("/recipe/:id", catchErrors(recipeController.getOneRecipe));

/**
 * POST /api/v1/recipe
 */
router.post(
  "/recipe",
  passport.authenticate("jwt", { session: false }),
  catchErrors(recipeController.addOneRecipe)
);

/**
 * PATCH /api/v1/recipe/:id
 */
router.patch(
  "/recipe/:id",
  passport.authenticate("jwt", { session: false }),
  catchErrors(recipeController.updateOneRecipe)
);

/**
 * DELETE /api/v1/recipe/:id
 */
router.delete(
  "/recipe/:id",
  passport.authenticate("jwt", { session: false }),
  catchErrors(recipeController.deleteOneRecipe)
);

/**
 * GET /api/v1/recipes/search?q=[query]
 */
router.get("/recipes/search", catchErrors(recipeController.searchRecipes));

/*
  Routes for Shopping Lists
*/
const shopListsController = require("../controllers/shopListsController");

/**
 * GET /api/v1/me/shopping_lists
 * Retrieve user shopping lists.
 */
router.get(
  "/me/shopping_lists",
  passport.authenticate("jwt", { session: false }),
  catchErrors(shopListsController.getShopLists)
);

/**
 * POST /api/v1/me/shopping_lists
 * Add shopping list item
 */
router.post(
  "/me/shopping_lists",
  passport.authenticate("jwt", { session: false }),
  catchErrors(shopListsController.addOneShoppingList)
);

/**
 * PATCH /api/v1/me/shopping_lists/:id
 * Update a shopping list item
 */
router.patch(
  "/me/shopping_lists/:id",
  passport.authenticate("jwt", { session: false }),
  catchErrors(shopListsController.updateOneShoppingList)
);

/**
 * DELETE /api/v1/me/shopping_lists
 * Delete a shopping list item
 */
router.delete(
  "/me/shopping_lists/:id",
  passport.authenticate("jwt", { session: false }),
  catchErrors(shopListsController.deleteOneShoppingList)
);

module.exports = router;
