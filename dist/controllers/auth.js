"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../helpers/responseHelper');
const { sendWelcomeEmail } = require('../helpers/mailer');
const { validateLogincredentials, validateUserSchema } = require('../validations/validation');
// Get all Users 
exports.doLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        const { error } = validateLogincredentials(req.body);
        if (error)
            return errorResponse(req, res, error.details[0].message, 400);
        // Validate if user exist in our database
        const user = yield User.findOne({
            where: {
                email
            }
        });
        console.log("user console =====> ", user);
        if (user && (yield bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
                expiresIn: "2h",
            });
            return successResponse(req, res, "User loggedin  successfully", user, token);
        }
        return errorResponse(req, res, "Invalid Credentials", 400);
    }
    catch (error) {
        if (error)
            return errorResponse(req, res, error.message, 400);
    }
    // Our register logic ends here
});
// Create User
exports.registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validateUserSchema(req.body);
        if (error)
            return errorResponse(req, res, error.details[0].message, 400);
        const payload = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 6)
        };
        const oldUser = yield User.findOne({
            where: {
                email: payload.email
            }
        });
        if (oldUser)
            return errorResponse(req, res, "This email is already used", 400);
        const newUser = yield User.create(payload);
        // Create token
        const token = jwt.sign({ user_id: newUser.id, email: newUser.email }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        // send user email
        sendWelcomeEmail(newUser);
        return successResponse(req, res, "User created successfully", newUser, token);
    }
    catch (error) {
        console.log(error);
        if (error)
            return errorResponse(req, res, error.message, 400);
    }
});
