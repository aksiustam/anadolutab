const passport = require("passport");

function authenticateWithJwt(req, res, next) {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error) {
      // Handle errors, e.g., token expired or verification failed
      return res.status(401).json({
        message: "Oturumunuz Sonlanmıştır. Lütfen tekrar giriş yapın...",
      });
    }

    if (info) {
      // Handle errors, e.g., token expired or verification failed
      return res.status(401).json({
        message: "Oturumunuz Sonlanmıştır. Lütfen tekrar giriş yapın...",
      });
    }
    next();
  })(req, res, next);
}

module.exports = authenticateWithJwt;
