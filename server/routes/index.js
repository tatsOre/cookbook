const passport = require("passport");
const router = require("express").Router();

const UserModel = require("../models/User");

const { catchErrors, NotFoundError } = require("../lib/errorHandlers");

/*
  Index
*/

router.get("/", (req, res) => {
  res.json({ message: "Welcome to CookBook App" });
});

/*
  Routes for User Controller
*/

/**
 * GET /api/v1/users
 * Retrive all users.
 */
router.get("/users", async (req, res, next) => {
  const users = await UserModel.find({});
  res.json({ total: users.length, users });
});

/**
 * GET /api/v1/user/me
 * Retrive user profile information.
 */
router.get(
  "/user/me",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      message: "You made it to the secure route",
      user: req.user,
    });
  }
);

/*
  Routes for Register and Auth Users Controller
*/
const {
  registerUser,
  registerGoogleUser,
  login,
  loginSuccess,
} = require("../controllers/authController");

/**
 * POST /api/v1/auth/register
 * Add/Register new user with local signup.
 */
router.post("/auth/register", catchErrors(registerUser));

/**
 * POST /api/v1/auth/login
 * Login a user - local login. Set JWT Cookie and send user main info.
 */
router.post("/auth/login", login, loginSuccess);

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
    failureRedirect: "http://127.0.0.1:5500/login.html", // Todo: change to client address
  }),
  registerGoogleUser,
  loginSuccess
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
} = require("../controllers/recipeController");

/**
 * GET /api/v1/recipes
 * Retrieve the list of all public recipe items.
 */
router.get("/recipes", getRecipes);

/**
 * GET /api/v1/recipe/:id
 * Retrieve recipe item with ID :id.
 */
router.get("/recipe/:id", catchErrors(getOneRecipe));

/**
 * POST /api/v1/recipe/create
 * Add new recipe item.
 */
router.post("/recipe/create", catchErrors(addOneRecipe));

/**
 * PATCH /api/v1/recipe/:id/update
 * Update recipe item with ID :id.
 */
router.patch("/recipe/:id/update", catchErrors(updateOneRecipe));

/**
 * DELETE /api/v1/recipe/:id/delete
 * Update recipe item with ID :id.
 */
router.delete("/recipe/:id/delete", catchErrors(deleteOneRecipe));

module.exports = router;
