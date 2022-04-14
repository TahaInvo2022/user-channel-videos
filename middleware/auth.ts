import { Request, Response, NextFunction } from 'express';
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helpers/responseHelper");
const config = process.env;

const verifyToken = (req:Request|any, res:Response, next:NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return errorResponse(req, res, "A token is required for authentication", 403)
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err:any) {
    return errorResponse(req, res, "Invalid Token", 401);
  }
  return next();
};

module.exports = verifyToken;