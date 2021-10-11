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
router.get("/me/search", userController.searchUserRecipes);

/**
 * GET /api/v1/user/:id
 * Retrieve user public profile information.
 */
router.get("/user/:id", catchErrors(userController.getOneUser));

/**
 * PATCH /api/v1/user/:id/update
 * Update user.
 */
router.patch("/user/:id/update", catchErrors(userController.updateOneUser));

/**
 * DELETE /api/v1/user/:id/delete
 * Delete user.
 */
router.delete("/user/:id/delete", catchErrors(userController.deleteOneUser));

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
  catchErrors(authController.registerUser)
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
router.get("/auth/logout", authController.logout);

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
router.get(
  "/auth/google_redirect",
  passport.authenticate("google", {
    assignProperty: "googleUser",
    failureRedirect: "http://localhost:3001/login", // Todo: change to client address
  }),
  authController.registerGoogleUser,
  authController.setJWTcookie
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
router.post("/recipe", catchErrors(recipeController.addOneRecipe));

/**
 * PATCH /api/v1/recipe/:id
 */
router.patch("/recipe/:id", catchErrors(recipeController.updateOneRecipe));

/**
 * DELETE /api/v1/recipe/:id
 */
router.delete("/recipe/:id", catchErrors(recipeController.deleteOneRecipe));

/**
 * GET /api/v1/recipes/search?q=[query]
 */
router.get("/recipes/search", catchErrors(recipeController.searchRecipes));

module.exports = router;
