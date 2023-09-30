const Product = require("../models/product");
const { sendSuccess, sendError } = require("../utils/utility"); 

const createProduct = async (req, res) => {
    try {
      const { name, description, price, available_quantity } = req.body;
      const newProduct = new Product({
        name,
        description,
        price,
        available_quantity,
      });

      const addedProduct = await newProduct.save();
      return sendSuccess(res, "Product created successfully", addedProduct);
    } catch (error) {
      return sendError(res, "Internal server error", 500, error);
    }
}



// Get all products
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    return sendSuccess(res, "Products retrieved successfully", products);
  } catch (error) {
    return sendError(res, "Internal server error", 500, error);
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const product = await Product.findOne({product_id:productId});
    if (!product) {
      return sendError(res, "Product not found", 404);
    }
    return sendSuccess(res, "Product retrieved successfully", product);
  } catch (error) {
    return sendError(res, "Internal server error", 500, error);
  }
};


// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const { name, description, price, available_quantity } = req.body;
    const query = { product_id: productId };
    const updateFields = {
      name,
      description,
      price,
      available_quantity,
    };
    const updatedProduct = await Product.findOneAndUpdate(
      query,
      updateFields,
      { new: true } 
    );

    if (!updatedProduct) {
      return sendError(res, "Product not found", 404);
    }

    return sendSuccess(res, "Product updated successfully", updatedProduct);
  } catch (error) {
    return sendError(res, "Internal server error", 500, error);
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const query = { product_id: productId };
    const deletedProduct = await Product.findOneAndRemove(query);

    if (!deletedProduct) {
      return sendError(res, "Product not found", 404);
    }

    return sendSuccess(res, "Product deleted successfully");
  } catch (error) {
    return sendError(res, "Internal server error", 500, error);
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};