const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../../models/user.js");

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async function (accessToken, refreshToken, profile, cbdone) {
    // passport Callback function
    await User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        cbdone(null, currentUser);
      } else {
        try {
          new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            password: null,
            isPasswordUsed: false,
            isAdressUsed: false,
            isRoleUsed: false,
          })
            .save()
            .then((newUser) => {
              cbdone(null, newUser);
            });
        } catch (error) {
          cbdone(error, null);
        }
      }
    });
  }
);

module.exports = googleStrategy;
