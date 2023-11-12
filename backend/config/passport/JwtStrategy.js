const JWTStrategy = require("passport-jwt").Strategy;
const User = require("../../models/user.js");

const getToken = (req) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    // Bearer tokenini ayrıştırın
    const token = authHeader.split(" ")[1];
    return token; // Tokeni req nesnesine ekleyin
  }
};
const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: (req) => getToken(req),
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true,
  },
  async function (req, jwtPayload, done) {
    if (!jwtPayload) {
      return done("Cookieler Bulunmuyor", null, "Cookieler Bulunmuyor");
    }

    const user = await User.findById(jwtPayload.data.id).lean();
    if (!user) {
      return done("No user found", null, "Kullanıcı Bulunamadı");
    }

    req.user = user;
    return done(null, user);
  }
);

module.exports = jwtStrategy;
