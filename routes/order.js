// Import necessary modules and dependencies
const router = require("express").Router();
const Auth = require("../middleware/auth");
const { placeOrder, userOrderList } = require("../controllers/order");
const validate = require("../validator/order");
const {
    PLACEORDER,
    USERORDERLIST
} = require("../constants/order");
// Define the paths
const PATH = {
    PLACEORDER: "/place-order",
    USERORDERLIST:"/user-order-lists/:user_id"
};

/**
 * @api {POST} /orders
 * @desc Place an order
 * @access private (requires authentication)
 **/
router.post(
    PATH.PLACEORDER,
    Auth.VerifyToken, 
    validate(PLACEORDER), 
    placeOrder
);
/**
 * @api {GET} /user-order-lists/:user_id
 * @desc Get all users orders
 * @access public
 **/
router.get(PATH.USERORDERLIST,validate(USERORDERLIST), userOrderList);
module.exports = router;
