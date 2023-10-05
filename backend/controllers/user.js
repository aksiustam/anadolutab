const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne(email);
  if (user) {
    return res
      .status(500)
      .json({ message: "Böyle bir kullanıcı zaten var !!!" });
  }
  if (password.length < 6) {
    return res
      .status(500)
      .json({ message: "Şifre 6 karakterden küçük olamaz" });
  }

  const passwordhash = await bcrypt.hash(password, 10);

  User.create({
    name: name,
    email: email,
    password: passwordhash,
  }).save();

  return res.status(200).json("User created");
};

const login = async (req, res) => {};
const logout = async (req, res) => {};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

module.exports = { register, login, forgotPassword, resetPassword, logout };
