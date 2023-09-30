
const router = require("express").Router();
const Auth = require("../middleware/auth");

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/product");
const {
    CREATEPRODUCT,
    GETALLPRODUCTS,
    GETPRODUCTBYID,
    UPDATEPRODUCT,
    DELETEPRODUCT
} = require("../constants/product");
const validate = require("../validator/product");

const PATH = {
    CREATEPRODUCT: "/create-product",
    GETALLPRODUCTS:"/products",
    GETPRODUCTBYID:"/products/:product_id",
    UPDATEPRODUCT:"/products/:product_id",
    DELETEPRODUCT:"/products/:product_id"
};

/**
 * @api {POST} /create-product
 * @desc Create Product API
 * @access public
 * **/
router.post(
    PATH.CREATEPRODUCT,
    validate(CREATEPRODUCT),
    createProduct
);


/**
 * @api {GET} /products
 * @desc Get all products
 * @access public
 **/
router.get(PATH.GETALLPRODUCTS,validate(GETALLPRODUCTS), getAllProducts);

/**
 * @api {GET} /products/:product_id
 * @desc Get a product by ID
 * @access public
 **/
router.get(PATH.GETPRODUCTBYID,validate(GETPRODUCTBYID), getProductById);

/**
 * @api {PUT} /products/:product_id
 * @desc Update a product by ID
 * @access public
 **/
router.put(PATH.UPDATEPRODUCT, validate(UPDATEPRODUCT),updateProduct);

/**
 * @api {DELETE} /products/:product_id
 * @desc Delete a product by ID
 * @access public
 **/
router.delete(PATH.DELETEPRODUCT,validate(DELETEPRODUCT), deleteProduct);


module.exports = router;