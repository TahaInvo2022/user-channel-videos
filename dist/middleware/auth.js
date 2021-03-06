"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helpers/responseHelper");
const config = process.env;
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return errorResponse(req, res, "A token is required for authentication", 403);
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    }
    catch (err) {
        return errorResponse(req, res, "Invalid Token", 401);
    }
    return next();
};
module.exports = verifyToken;
