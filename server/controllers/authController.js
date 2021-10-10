const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");

const {
  DuplicateKeyError,
  InvalidPropertyError,
  NotFoundError,
} = require("../lib/errorHandlers");

/**
 * POST /api/v1/auth/register
 * Add new user item.
 */
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await UserModel.findOne({ email });
  if (user)
    throw new DuplicateKeyError("This email address is already being used");

  user = await UserModel.create({ name, email, password });
  // Decide if login the user...
  res.json({ message: ["Signup successful"] });
};

/**
 * GET /api/v1/auth/google_redirect
 * Register|Find Google Users.
 */
exports.registerGoogleUser = async (req, res, next) => {
  const { googleUser } = req;
  let user = await UserModel.findOne({ "providers.google.id": googleUser.id });
  if (!user) {
    user = await UserModel.create({
      name: googleUser._json.name,
      email: googleUser._json.email,
      password: googleUser._json.email + googleUser._json.sub,
      providers: {
        google: {
          id: googleUser._json.sub,
          email: googleUser._json.email,
          displayName: googleUser._json.name,
        },
      },
      photo: googleUser._json.picture,
    });
  }
  req.user = user;
  return next();
};

/**
 * POST /api/v1/auth/login
 * Login a user - local login.
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("-providers");
  if (!user)
    throw new NotFoundError(
      "Email not found or you do not have an account yet"
    );

  const validate = await user.isValidPassword(password);
  if (!validate)
    throw new InvalidPropertyError("Your email and password do not match");

  req.user = user;
  next();
};

/**
 * Set JWT Cookie and send user main info.
 */
// TODO: fix Google flow
exports.setJWTcookie = async (req, res) => {
  console.log(req.cookies);
  const { user } = req;
  const body = { _id: user._id, email: user.email };
  const expiresIn = "7d";
  const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
    expiresIn,
  });
  res
    .cookie(process.env.COOKIE_SECRET, token, {
      expires: new Date(Date.now() + 7 * 24 * 3600000), // 7 days
      httpOnly: true,
    })
    .json({ message: ["successfully logged in"] });
};

/**
 * GET /api/v1/auth/logout
 */
exports.logout = async (req, res) => {
  console.log(req.cookies);
  res.clearCookie(process.env.COOKIE_SECRET);
  res.json({ message: ["logout successful"] });
};

/**
 * Handler
 */
exports.confirmPasswords = async (req, res, next) => {
  if (req.body.password !== req.body["confirm_password"]) {
    throw new InvalidPropertyError("Your passwords do not match");
  }
  console.log("Before next");
  return next();
};
