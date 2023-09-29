const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    latinname: {
      type: String,
      required: true,
    },
    usedtype: {
      type: String,
    },
    stock: {
      type: String,

      default: 0,
    },
    category: {
      type: String,
    },
    ingredient: {
      type: String,
    },
    description: {
      type: String,
    },
    price: [
      {
        date: {
          type: String,
        },
        pricein: {
          type: String,
        },
        priceavg: {
          type: String,
        },
        priceout: {
          type: String,
        },
      },
    ],

    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    avgrating: { type: Number, default: 0 },
    images: [
      {
        public_id: { type: String },
        url: { type: String },
      },
    ],
    reviews: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: "User" },
        name: { type: String },
        comment: { type: String },
        rating: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
