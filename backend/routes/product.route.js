// routes/product.routes.js
import express from "express";
import {
  products,
  addProduct,
  editProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/products", products);
router.post("/add-product", addProduct);
router.post("/edit-product", editProduct);
router.post("/delete-product", deleteProduct);

export default router;
