const User = require("../models/user.js");

const userDetail = async (req, res) => {
  const user = await User.findById(req.session.passport.user);
  res.status(200).json(user.name);

  // await User.findOne(
  //   { email: req.session.passport.user.email },
  //   function (err, user) {
  //     if (err) console.log(err);

  //     const { first_name, last_name } = user;

  //     res.status(200).send({
  //       first_name,
  //       last_name,
  //     });
  //   }
  // );
};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

module.exports = { userDetail, forgotPassword, resetPassword };
