const User = require("../models/user.js");

const userDetail = (req, res) => {
  const user = req.user;
  const data = {
    id: user._id,
    name: user.name,
    email: user.email,
    isPasswordUsed: user.isPasswordUsed,
    isAdressUsed: user.isAdressUsed,
    isRoleUsed: user.isRoleUsed,
    role: user.role,
  };
  res.status(200).json(data);
};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

module.exports = { userDetail, forgotPassword, resetPassword };
