const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
    },
    googleId: {
      type: String,
      unique: true,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    isPasswordUsed: { type: Boolean },
    isAdressUsed: { type: Boolean },
    isRoleUsed: { type: Boolean },
    role: {
      type: String,
      default: "user",
    },
  },
  { collection: "User", timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
