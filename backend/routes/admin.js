const express = require("express");
const { todoGet, todoSet, todoUpdate } = require("../controllers/admin");
const { checkIsInRole } = require("../middleware/auth");
const { authenticateWithJwt } = require("../middleware/jwt");

const router = express.Router();

router.get(
  "/todo",
  authenticateWithJwt,
  checkIsInRole("user", "admin"),
  todoGet
);
router.post(
  "/todo",
  authenticateWithJwt,
  checkIsInRole("user", "admin"),
  todoSet
);

module.exports = router;
