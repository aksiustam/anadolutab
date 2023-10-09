//const FacebookStrategy = require("passport-facebook");
//const InstagramStrategy = require("passport-instagram");
const User = require("../models/user.js");
function initialize(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });

  // passport.deserializeUser((id, done) => {
  //   User.findById(id).then((user) => {
  //     done(null, user);
  //   });
  // });

  //Requiring Login - Register strategy files
  const LoginStrategy = require("./passport/LoginStrategy.js");
  const RegisterStrategy = require("./passport/RegisterStrategy.js");
  const GoogleStrategy = require("./passport/GoogleStrategy.js");
  //Using the above
  passport.use("local-login", LoginStrategy);
  passport.use("local-register", RegisterStrategy);
  passport.use("google", GoogleStrategy);
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
