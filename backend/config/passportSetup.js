const GoogleStrategy = require("passport-google-oauth20");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
//const FacebookStrategy = require("passport-facebook");
//const InstagramStrategy = require("passport-instagram");

const User = require("../models/user.js");

function initialize(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  const authenticateUser = async (email, password, done) => {
    console.log(email, password);
    const user = User.findOne(email);
    if (user == null) {
      return done(null, false, { message: "Bu emailde User bulunamadı." });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Şifre hatalı." });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
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
}
module.exports = initialize;
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
