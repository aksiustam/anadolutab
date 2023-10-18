const JWTStrategy = require("passport-jwt").Strategy;
const User = require("../../models/user.js");

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: (req) => req.cookies.jwt,
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true,
  },
  async function (req, jwtPayload, done) {
    const user = await User.findById(jwtPayload.data.id).lean();
    if (!user) {
      return done("No user found", null, "Kullanıcı Bulunamadı");
    }

    req.user = user;
    return done(null, user);
  }
);

module.exports = jwtStrategy;
