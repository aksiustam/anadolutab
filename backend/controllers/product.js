const Product = require("../models/product.js");
const ProductFilter = require("../utils/productFilter.js");
const cloudinary = require("cloudinary").v2;

const allProducts = async (req, res) => {
  try {
    let category = req.query.category || "All";

    const categoryMappings = {
      sabit: "Sabit Yağlar",
      ucucu: "Uçucu Yağlar",
      drog: "Droglar",
      tohum: "Tohumlar",
      baharat: "Baharatlar",
      diger: "Diğer Kategoriler",
    };
    category === "All"
      ? (category = Object.values(categoryMappings))
      : (category = req.query.category
          .split(",")
          .map((item) => categoryMappings[item]));

    const products = await Product.find(
      {},
      { name: 1, latinname: 1, usedtype: 1, ingredient: 1, price: 1 }
    )
      .where("category")
      .in([...category]);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const detailProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res, next) => {
  try {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push();
    } else {
      images = req.body.images;
    }

    let allImage = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader(images[i], {
        folder: "products",
      });

      allImage.push({ public_id: result.public_id, url: result.secure_url });
    }
    req.body.images = allImage;

    const product = await Product.create(req.body);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    for (let i = 0; i < product.images.lenght; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }

    await product.deleteOne();
    res.status(200).json({ message: "Ürün başarıyla silindi!!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    let images = [];
    if (typeof req.body.images === "string") {
      images.push();
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      for (let i = 0; i < product.images.lenght; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
      }
    }

    let allImage = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader(images[i], {
        folder: "products",
      });

      allImage.push({ public_id: result.public_id, url: result.secure_url });
    }
    req.body.images = allImage;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReview = async (req, res, next) => {
  const { productId, comment, rating } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    comment,
    rating: Number(rating),
  };
  const product = await Product.findById(productId);

  product.reviews.push(review);

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg = rev.rating;
  });

  product.avgrating = avg / product.reviews.lenght;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ message: "Yorumun Başarıyla Kaydedildi." });
};

module.exports = {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
};
