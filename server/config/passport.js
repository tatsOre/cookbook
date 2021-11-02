const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const UserModel = require("../models/User");

module.exports = function () {
  const callbackBASEURL =
    process.env.NODE_ENV !== "development"
      ? process.env.SERVER_ADDRESS
      : "http://localhost:3000";

  const options = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies[process.env.COOKIE_SECRET];
      }
      return token;
    },
  };

  passport.use(
    new JWTstrategy(options, async (token, done) => {
      const user = await UserModel.findOne({ _id: token.user._id });
      if (user) return done(null, user);
      return done(null, false);
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_APP_CLIENT_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET_KEY,
        callbackURL: `${callbackBASEURL}/api/v1/auth/google_redirect`,
      },
      function (accessToken, refreshToken, profile, done) {
        // console.log({ accessToken, refreshToken, profile });
        return done(null, profile);
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
};
