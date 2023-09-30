
const router = require("express").Router();
const { topProducts } = require("../controllers/analytics");


const PATH = {
    TOPPRODUCTS: "/top-products",
    
};

/**
 * @api {GET} /top-products
 * @desc Top Products
 * @access public
 **/
router.get(PATH.TOPPRODUCTS, topProducts);
module.exports = router;
