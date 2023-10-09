// import jwt from "jsonwebtoken";
// const bcrypt = require("bcryptjs");

// const signToken = (user) => {
//   return jwt.sign({ data: user }, process.env.JWT_SECRET, {
//     expiresIn: 604800,
//   });
// };
// const hashPassword = async (password) => {
//   if (!password) {
//     throw new Error("Password was not provided");
//   }

//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };

// const verifyPassword = async (candidate, actual) => {
//   return await bcrypt.compare(candidate, actual);
// };

// const getRedirectUrl = (role) => {
//   switch (role) {
//     case ROLES.Admin:
//       return "/admin-dashboard";
//     case ROLES.Customer:
//       return "/customer-dashboard";
//     default:
//       return "/";
//   }
// };

// export { verifyPassword, hashPassword, signToken, getRedirectUrl };
