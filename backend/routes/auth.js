const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("LOGİN");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session:", err);
    } else {
      req.logout(() => {
        console.log("You are logged out");
        res.redirect("/");
      });
    }
  });
});

// passport.authenticate middleware is used here to authenticate the request
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"], // Used to specify the required data
  })
);

// The middleware receives the data from Google and runs the function on Strategy config
//
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = router;
