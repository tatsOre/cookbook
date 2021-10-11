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
const {
  getOneUser,
  getCurrentUser,
  updateOneUser,
  deleteOneUser,
  getFavorites,
  updateFavorites,
  searchUserRecipes,
} = require("../controllers/userController");

/**
 * GET /api/v1/user/me
 * Retrive user profile information.
 */
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

/**
 * GET /api/v1/me/favorites
 * Retrieve user favorites.
 */
router.get(
  "/me/favorites",
  passport.authenticate("jwt", { session: false }),
  catchErrors(getFavorites)
);

/**
 * POST /api/v1/me/favorites
 * Add/Remove a recipe to/from user favorites.
 */
router.post(
  "/me/favorites",
  passport.authenticate("jwt", { session: false }),
  catchErrors(updateFavorites)
);

/**
 * GET /api/v1/me/search?field=:field&q=:queryParam
 * EX: http://localhost:3000/api/v1/me/search?field=recipes&q=pasta
 */
router.get("/me/search", searchUserRecipes);

/**
 * GET /api/v1/user/:id
 * Retrieve user public profile information.
 */
router.get("/user/:id", catchErrors(getOneUser));

/**
 * PATCH /api/v1/user/:id/update
 * Update user.
 */
router.patch("/user/:id/update", catchErrors(updateOneUser));

/**
 * DELETE /api/v1/user/:id/delete
 * Delete user.
 */
router.delete("/user/:id/delete", catchErrors(deleteOneUser));

/*
  Routes for Register and Auth Users Controller
*/
const {
  registerUser,
  registerGoogleUser,
  login,
  setJWTcookie,
  logout,
  confirmPasswords,
} = require("../controllers/authController");

/**
 * POST /api/v1/auth/register
 * Add/Register new user with local signup.
 */
router.post(
  "/auth/register",
  catchErrors(confirmPasswords),
  catchErrors(registerUser)
);

/**
 * POST /api/v1/auth/login
 * Login a user - local login. Set JWT Cookie and send user main info.
 */
router.post("/auth/login", catchErrors(login), setJWTcookie);

/**
 * GET /api/v1/auth/logout
 * Removes JWT Cookie and logout the user.
 */
router.get("/auth/logout", logout);

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
  registerGoogleUser,
  setJWTcookie
);

/*
  Routes for Recipes Controller
*/
const {
  getRecipes,
  getOneRecipe,
  addOneRecipe,
  updateOneRecipe,
  deleteOneRecipe,
  searchRecipes,
} = require("../controllers/recipeController");

/**
 * GET /api/v1/recipes
 * Retrieve the list of all public recipe items.
 */
router.get("/recipes", getRecipes);

/**
 * GET /api/v1/recipe/:id
 */
router.get("/recipe/:id", catchErrors(getOneRecipe));

/**
 * POST /api/v1/recipe/create
 */
router.post("/recipe/create", catchErrors(addOneRecipe));

/**
 * PATCH /api/v1/recipe/:id/update
 */
router.patch("/recipe/:id/update", catchErrors(updateOneRecipe));

/**
 * DELETE /api/v1/recipe/:id/delete
 */
router.delete("/recipe/:id/delete", catchErrors(deleteOneRecipe));

/**
 * GET /api/v1/recipes/search?q=[query]
 */
router.get("/recipes/search", searchRecipes);

module.exports = router;
