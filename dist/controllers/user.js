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
const { User, Channel } = require('../models');
const { successResponse, errorResponse } = require('../helpers/responseHelper');
const { validateUserUpdate } = require('../validations/validation');
// Get all Users 
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.findAll({
            include: [
                {
                    model: Channel,
                }
            ]
        });
        return successResponse(req, res, "All users are fetched", users);
    }
    catch (error) {
        return errorResponse(req, res, error.message, 400);
    }
});
// Get one User 
exports.showUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const users = yield User.findOne({
            include: [
                {
                    model: Channel,
                }
            ],
            where: {
                id: id,
            }
        });
        if (!users) {
            return errorResponse(req, res, "User does not exist", 400);
        }
        return successResponse(req, res, "One user is fetched", users);
    }
    catch (error) {
        return errorResponse(req, res, error.message, 400);
    }
});
// Update user
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User.findOne({
            where: {
                id: id
            }
        });
        if (!user)
            return errorResponse(req, res, "User not found", 400);
        const { error } = validateUserUpdate(req.body);
        if (error)
            return errorResponse(req, res, error.details[0].message, 400);
        const payload = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        const oldUser = yield User.update(payload, {
            where: {
                id: id
            }
        });
        return successResponse(req, res, "User updated successfully");
    }
    catch (error) {
        if (error)
            return errorResponse(req, res, error.message, 400);
    }
});
// delete user 
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User.findOne({
            where: {
                id: id
            }
        });
        if (!user)
            return errorResponse(req, res, "User not found", 400);
        const oldUser = yield User.destroy({
            where: {
                id: id
            }
        });
        return successResponse(req, res, "User deleted successfully");
    }
    catch (error) {
        if (error)
            return errorResponse(req, res, error.message, 400);
    }
});
