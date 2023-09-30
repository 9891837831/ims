const Order = require("../models/order");
const Product = require("../models/product");

const { sendSuccess, sendError } = require("../utils/utility");


const topProducts = async (req, res) => {
    try {
        const productCounts = await Order.aggregate([
            {
                $group: {
                    _id: '$product_id',
                    totalOrdered: { $sum: '$quantity' },
                },
            },
            {
                $sort: { totalOrdered: -1 },
            },
            {
                $limit: 5,
            },
        ]);
      
        const topProducts = [];
        for (const productCount of productCounts) {
            const product = await Product.findOne({ product_id: productCount._id });
            if (product) {
                topProducts.push({
                    product_id: product.product_id,
                    name: product.name,
                    total_ordered: productCount.totalOrdered,
                });
            }
        }

        // Return the formatted response as a JSON response
        return sendSuccess(res, "Top 5 most ordered products retrieved successfully", topProducts);

    } catch (error) {
        return sendError(res, "Internal server error", 500, error);
    }
};



module.exports = {
    topProducts
};
