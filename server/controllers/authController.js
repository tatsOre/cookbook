const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");

const { DuplicateKeyError, NotFoundError } = require("../lib/errorHandlers");

/**
 * POST /api/v1/auth/register
 * Add new user item.
 */
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  let user = await UserModel.findOne({ email });
  if (user) throw new DuplicateKeyError("User already exists");

  user = await UserModel.create({ email, password });
  // Decide if login the user...
  res.json({
    message: "Signup successful",
    user: user.email,
  });
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
      firstName: googleUser._json.given_name,
      lastName: googleUser._json.family_name,
      email: googleUser._json.email,
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

  const user = await UserModel.findOne({ email });
  if (!user) throw new NotFoundError("User not found");

  const validate = await user.isValidPassword(password);
  if (!validate) {
    return res.status(401).json({ message: "Wrong password" });
  }
  req.user = user;
  return next();
};

/**
 * Set JWT Cookie and send user main info.
 */
exports.loginSuccess = async (req, res) => {
  const { user } = req;
  const body = { _id: user._id, email: user.email };
  const expiresIn = "7d";
  const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
    expiresIn,
  });
  res.cookie(process.env.COOKIE_SECRET, token, {
    expires: new Date(Date.now() + 7 * 24 * 3600000), // 7 days
    httpOnly: true,
  });
  //console.log({ user });
  const data = { ...user._doc };
  delete data["password"];
  delete data["providers"]["google"];
  res.json({ message: "Login successful", user });
};
