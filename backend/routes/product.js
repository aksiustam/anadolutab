const express = require("express");
const {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
} = require("../controllers/product.js");
const {
  isUserAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/auth.js");

const router = express.Router();

router.get("/products", isUserAuthenticated, allProducts);
router.get("/admin/products", isAdminAuthenticated, adminProducts);
router.get("/product/:id", isUserAuthenticated, detailProduct);
router.post("/product/new", isUserAuthenticated, createProduct);
router.post("/product/newReview", isUserAuthenticated, createReview);
router.delete("/product/:id", isUserAuthenticated, deleteProduct);
router.put("/product/:id", isUserAuthenticated, updateProduct);

module.exports = router;
