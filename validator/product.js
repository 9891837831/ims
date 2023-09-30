const { body, param } = require("express-validator");
const {
    CREATEPRODUCT,
    UPDATEPRODUCT,
    DELETEPRODUCT
} = require("../constants/product");

const validate = (method) => {
    let error = [];
    switch (method) {
        case CREATEPRODUCT: {
            error = [
                body("name").notEmpty().withMessage("Name is required"),
                body("description").notEmpty().withMessage("Description is required"),
                body("price")
                    .isNumeric()
                    .withMessage("Price must be a numeric value")
                    .notEmpty()
                    .withMessage("Price is required"),
                body("available_quantity")
                    .isInt({ min: 0 })
                    .withMessage("Available quantity must be a non-negative integer")
                    .notEmpty()
                    .withMessage("Available quantity is required")
            ];
            break;
        }
        case UPDATEPRODUCT: {
            error = [
                param("id").notEmpty().withMessage("Product ID is required"),
                body("name").optional(),
                body("description").optional(),
                body("price")
                    .optional()
                    .isNumeric()
                    .withMessage("Price must be a numeric value"),
                body("available_quantity")
                    .optional()
                    .isInt({ min: 0 })
                    .withMessage("Available quantity must be a non-negative integer")
            ];
            break;
        }
        case DELETEPRODUCT: {
            error = [
                param("id").notEmpty().withMessage("Product ID is required")
            ];
            break;
        }
    }
    return error;
};

module.exports = validate;
