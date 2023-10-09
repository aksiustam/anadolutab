const Strategy = require("passport-local").Strategy;
const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");

const LoginStrategy = new Strategy({ usernameField: "email" }, async function (
  email,
  password,
  done
) {
  const user = await User.findOne({ email: email }).lean();

  if (!user) {
    return done("No user found", null);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return done("Email or Password not valid", null);
  }

  return done(null, user);
});

module.exports = LoginStrategy;
