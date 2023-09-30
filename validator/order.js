const { body } = require("express-validator");
const {
    PLACEORDER,
} = require("../constants/order");

const validate = (method) => {
    let error = [];
    switch (method) {
        case PLACEORDER: {
            error = [
                body("product_id").notEmpty().withMessage("Product ID is required"),
                body("quantity")
                    .isInt({ min: 1 })
                    .withMessage("Quantity must be a positive integer")
                    .notEmpty()
                    .withMessage("Quantity is required")
            ];
            break;
        }
    }
    return error;
};

module.exports = validate;
