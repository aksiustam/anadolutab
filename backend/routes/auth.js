const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session:", err);
    } else {
      req.logout(() => {
        return res.json({ message: "You are logged out" });
      });
    }
  });
});

//Login passport authentication
router.post("/login", function (req, res) {
  passport.authenticate("local-login", function (error, user, info) {
    if (error) {
      return res.status(500).json({
        message: error || "Something happend",
        error: error.message || "Server error",
      });
    }

    req.login(user, function (error, data) {
      if (error) {
        return res.status(500).json({
          message: error || "Something happend",
          error: error.message || "Server error",
        });
      }
    });

    user.isAuthenticated = true;
    return res.json(user);
  })(req, res);
});

//Register passport authentication
router.post("/register", (req, res) => {
  passport.authenticate("local-register", function (error, user, info) {
    if (error) {
      return res.status(500).json({
        message: error || "Something happend",
        error: error.message || "Server error",
      });
    }
    req.login(user, function (error, data) {
      if (error) {
        return res.status(500).json({
          message: error || "Something happend",
          error: error.message || "Server error",
        });
      }
      return res.json(user);
    });
  })(req, res);
});

// passport.authenticate middleware is used here to authenticate the request
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Used to specify the required data
  })
);

// The middleware receives the data from Google and runs the function on Strategy config
//
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    failureMessage: true,
  }),
  function (req, res) {
    return res.json(req.user);
  }
);

module.exports = router;
