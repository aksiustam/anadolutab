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
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    isPasswordUsed: { type: Boolean, default: false },
    isAdressUsed: { type: Boolean, default: false },
    isRoleUsed: { type: Boolean, default: false },
    role: {
      type: String,
      default: "user",
    },
  },
  { collection: "User", timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
