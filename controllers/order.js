const Order = require("../models/order");
const Product = require("../models/product");
const { sendSuccess, sendError } = require("../utils/utility");


const placeOrder = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const {user_id }= req.user; 
        const product = await Product.findOne({ product_id });

        if (!product) {
            return sendError(res, `Product with ID ${product_id} not found`, 404);
        }
        if (product.available_quantity < quantity) {
            return sendError(
                res,
                `Insufficient quantity for product with ID ${product_id}`,
                400
            );
        }
        const productPrice = product.price * quantity;
        const newOrder = await Order.create({
            user_id,
            total_price: productPrice,
            status: "pending",
            product_id,
            quantity,
        });
        product.available_quantity -= quantity;
        await product.save();

        return sendSuccess(res, "Order placed successfully", newOrder);
    } catch (error) {
        return sendError(res, "Internal server error", 500, error);
    }
};

const userOrderList = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const orders = await Order.find({ user_id: userId });

        if (!orders || orders.length === 0) {
 
            return sendError(res, "No orders found for the user", 404);
        }

        // Return the list of orders as a JSON response
        return sendSuccess(res, "Orders retrieved successfully", orders);
    } catch (error) {
        return sendError(res, "Internal server error", 500, error);
    }
};

module.exports = {
    placeOrder,
    userOrderList
};
