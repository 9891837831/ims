
const router = require("express").Router();
const Auth = require("../middleware/auth");

const {
    signup,
    login,
} = require("../controllers/user");
const {
    SIGNUP,
    LOGIN
} = require("../constants/user");
const validate = require("../validator/user");

const PATH = {
    SIGNUP: "/signup",
    ROOT: "/",
    LOGIN: "/login",
};

/**
 * @api {POST} /signup
 * @desc SignUp API
 * @access public
 * **/
router.post(
    PATH.SIGNUP,
    validate(SIGNUP),
    signup
);

/**
 * @api {POST} /login
 * @desc LOGIN API
 * @access private
 * **/
router.post(
    PATH.LOGIN,
    validate(LOGIN),
    login
);



module.exports = router;