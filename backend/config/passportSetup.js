const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
//const FacebookStrategy = require("passport-facebook");
//const InstagramStrategy = require("passport-instagram");
require("dotenv").config();
const User = require("../models/user.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
//hey
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cbdone) {
      // passport Callback function
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          cbdone(null, currentUser);
        } else {
          new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            password: null,
          })
            .save()
            .then((newUser) => {
              cbdone(null, newUser);
            });
        }
      });
    }
  )
);

// Strategy config

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: "FACEBOOK_APP_ID",
//       clientSecret: "FACEBOOK_APP_SECRET",
//       callbackURL: "http://localhost:3000/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );

// passport.use(
//   new InstagramStrategy(
//     {
//       clientID: INSTAGRAM_CLIENT_ID,
//       clientSecret: INSTAGRAM_CLIENT_SECRET,
//       callbackURL: "http://127.0.0.1:3000/auth/instagram/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       User.findOrCreate({ instagramId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );
