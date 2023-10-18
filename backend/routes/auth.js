const express = require("express");
const passport = require("passport");
const { to } = require("await-to-js");

const { login, signToken } = require("../utils/utils.js");

const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

router.get("/logout", (req, res) => {
  const options = {
    exprires: new Date(Date.now() + 10000),
    withCredentials: true,
    secure: true,
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("jwt", "expiredtoken", options)
    .json({ status: "success" });
});

//Login passport authentication
router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).lean();

  if (!user) {
    return res.status(500).json({ message: "No user found!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(500).json({ message: "Email or Password not valid!" });
  }

  const [error, token] = await to(login(req, user));

  if (error) {
    return res.status(500).json({ message: error });
  }
  const data = {
    id: user._id,
    name: user.name,
    email: user.email,
    isPasswordUsed: user.isPasswordUsed,
    isAdressUsed: user.isAdressUsed,
    isRoleUsed: user.isRoleUsed,
    role: user.role,
  };
  return res
    .status(200)
    .cookie("jwt", token, {
      withCredentials: true,
      secure: true,
      httpOnly: true,
    })
    .json({
      success: true,
      token: token,
      data: data,
    });
});

//Register passport authentication
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email }).lean();
  if (user) {
    return res
      .status(500)
      .json({ message: "User already exist. Please login!" });
  }
  if (!user) {
    const encryptedPassword = await bcrypt.hash(password, 10);

    let newUser = new User({
      name: name,
      email: email,
      password: encryptedPassword,
      isPasswordUsed: true,
      isAdressUsed: false,
      isRoleUsed: false,
    });

    newUser.save();
    return res.status(200).json({
      success: true,
    });
  }
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
  }),
  function (req, res) {
    return res.status(200).cookie("jwt", signToken(req.user), {
      httpOnly: true,
    });
  }
);

module.exports = router;
