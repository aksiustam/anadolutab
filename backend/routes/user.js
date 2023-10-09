const express = require("express");
const {
  forgotPassword,
  resetPassword,
  userDetail,
} = require("../controllers/user.js");
const { checkIsInRole } = require("../middleware/auth.js");
const router = express.Router();

router.get("/forgotPass", forgotPassword);
router.get("/resetPass", resetPassword);
router.get("/detail", userDetail);

// router.get("/products", checkIsInRole("user", "admin"), allProducts);
// router.get("/admin/products", checkIsInRole("admin"), adminProducts);
// router.get("/product/:id", checkIsInRole("user", "admin"), detailProduct);
// router.post("/product/new", checkIsInRole("user", "admin"), createProduct);
// router.post("/product/newReview", checkIsInRole("user", "admin"), createReview);
// router.delete("/product/:id", checkIsInRole("user", "admin"), deleteProduct);
// router.put("/product/:id", checkIsInRole("user", "admin"), updateProduct);

module.exports = router;
