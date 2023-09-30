const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        ref: "User",
        required: true,
    },
    order_id: {
        type: String,
        default: uuidv4,
    },
    product_id: {
        type: String,
        ref: "Product",
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "completed"],
        default: "pending",
    },
});

module.exports = mongoose.model("Order", orderSchema);
