// product.controller.js
import Product from "../models/product.model.js"; // Assuming Product model is defined in ../models/Product.js

// Get all products
export const products = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new product
export const addProduct = async (req, res) => {
  const { name, price, addedBy } = req.body;

  const newProduct = new Product({
    name,
    price,
    addedBy,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({ savedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit an existing product
export const editProduct = async (req, res) => {
  const { id, name, price, addedBy } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, addedBy },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
