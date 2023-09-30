const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const { sendSuccess, sendError } = require("../utils/utility"); 
const Auth = require("../middleware/auth");

const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = errors.array()[0].msg;
            return sendError(res, error, 400);
        }
        const { email, password } = req.body;
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return sendError(res, "User already exists", 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            email,
            password: hashedPassword,
        });
        const addedUser = await newUser.save();
        return sendSuccess(res, "Registration successful", addedUser);
    } catch (error) {
        return sendError(res, "Internal server error", 500, error);
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = errors.array()[0].msg;
            return sendError(res, error, 400);
        }
        const { email, password } = req.body;
        // Find the user by email
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return sendError(res, 'You are not registered!', 400);
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return sendError(res, 'Wrong password!', 400);
        }
        // Generate a JWT token for authentication
        const token = Auth.generateAuthToken(user)
        return sendSuccess(res, "Login successful", { token, data: user });
    } catch (error) {
        return sendError(res, "Internal server error", 500, error);
    }
};

module.exports = {
    signup,
    login
};
