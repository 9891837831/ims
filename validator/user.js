const { body } = require("express-validator");
const {
    SIGNUP,
    LOGIN,
} = require("../constants/user");

const validate = (method) => {
    let error = [];
    switch (method) {
        case SIGNUP: {
            error = [
                body("email", "Please enter email").not().isEmpty(),
                body("password", "Please enter password").not().isEmpty(),
            ];
            break;
        }
        case LOGIN: {
            error = [
                body("email", "Please enter email").not().isEmpty(),
                body("password", "Please enter password").not().isEmpty()
            ];
            break;
        }
    }
    return error;
};

module.exports = validate;