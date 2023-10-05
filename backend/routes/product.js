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
const { checkIsInRole } = require("../middleware/auth.js");
const router = express.Router();

router.get("/products", allProducts);
router.get("/admin/products", adminProducts);
router.get("/product/:id", detailProduct);
router.post("/product/new", createProduct);
router.post("/product/newReview", createReview);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);

// router.get("/products", checkIsInRole("user", "admin"), allProducts);
// router.get("/admin/products", checkIsInRole("admin"), adminProducts);
// router.get("/product/:id", checkIsInRole("user", "admin"), detailProduct);
// router.post("/product/new", checkIsInRole("user", "admin"), createProduct);
// router.post("/product/newReview", checkIsInRole("user", "admin"), createReview);
// router.delete("/product/:id", checkIsInRole("user", "admin"), deleteProduct);
// router.put("/product/:id", checkIsInRole("user", "admin"), updateProduct);

module.exports = router;
