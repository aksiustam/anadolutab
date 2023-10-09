const Strategy = require("passport-local").Strategy;
const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");

const SignupStrategy = new Strategy(
  { passReqToCallback: true, usernameField: "email" },
  async function (req, email, password, done) {
    const user = await User.findOne({ email: email }).lean();
    if (user) {
      return done("User already exist. Please login!", null);
    }
    if (!user) {
      const encryptedPassword = await bcrypt.hash(password, 10);

      let newUser = new User({
        name: req.body.name,
        email: email,
        password: encryptedPassword,
        isPasswordUsed: true,
        isAdressUsed: false,
        isRoleUsed: false,
      });

      newUser.save();
      return done(null, newUser);
    }
  }
);

module.exports = SignupStrategy;
