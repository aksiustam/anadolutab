const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    todo: [
      {
        name: String,
        done: Boolean,
      },
    ],
    todoBig: [
      {
        name: String,
        done: Boolean,
      },
    ],
  },
  { collection: "Admin", timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
