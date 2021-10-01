const mongoose = require("mongoose");
const User = mongoose.model("User");

/**
 * POST /account/signup
 * Register a new user
 */
exports.user_register = async (req, res, next) => {
  console.log(req.body);
  const user = new User({
    email: req.body.email,
  });

  User.register(user, req.body.password, (err) => {
    if (err) {
      err.status = 403;
      return next(err);
    }
    return res.json({ user });
  });
};
