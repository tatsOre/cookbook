const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const UserModel = require("../models/User");

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      console.log("token:", token);
      const user = await UserModel.findOne({ _id: token.user._id });
      if (user) return done(null, user);
      return done(null, false);
    }
  )
);

/*
Authorization: Bearer token
token: {
  user: { _id: '61576e446d162fbd4c57af0b', email: 'example@gmail.com' },
  iat: 1633124205,
  exp: 1633729005
}
*/
