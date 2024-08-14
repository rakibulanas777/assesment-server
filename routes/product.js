const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createProduct,
  getAllProducts,
  getProductById,
  getNewProducts,
  getProductsFromDistinctCatagory,
  getTopRating,
  removeProductById,
} = require("../controller/product");

router = express.Router();

router.post("/addProduct", protect, createProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getNewProducts", getNewProducts);
router.get("/getToRated", getTopRating);
router.get("/specialProducts", getProductsFromDistinctCatagory);
router.get("/getProduct/:id", getProductById);
router.delete("/products/:id", removeProductById);
module.exports = router;
