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
const { validateChannelSchema } = require('../validations/validation');
// Get all Channel 
exports.getAllChannels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = yield Channel.findAll({
            include: [
                {
                    model: User,
                }
            ]
        });
        return successResponse(req, res, "All channels are fetched", channels);
    }
    catch (error) {
        return errorResponse(req, res, error.message, 400);
    }
});
// Get one Channel 
exports.showChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const users = yield Channel.findOne({
            include: [
                {
                    model: User,
                }
            ],
            where: {
                id: id,
            }
        });
        return successResponse(req, res, "One Channel is fetched", users);
    }
    catch (error) {
        return errorResponse(req, res, error.message, 400);
    }
});
// Create Channel
exports.createChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validateChannelSchema(req.body);
        if (error)
            return errorResponse(req, res, error.details[0].message, 400);
        const payload = {
            title: req.body.title,
            User_id: req.body.userId
        };
        const oldChannel = yield Channel.findOne({
            where: {
                title: payload.title
            }
        });
        if (oldChannel)
            return errorResponse(req, res, "This name is already used", 400);
        const newChannel = yield Channel.create(payload);
        return successResponse(req, res, "Channel created successfully", newChannel);
    }
    catch (error) {
        if (error)
            return errorResponse(req, res, error.message, 400);
    }
});
// Update Channel
exports.updateChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const channel = yield Channel.findOne({
            where: {
                id: id
            }
        });
        if (!channel)
            return errorResponse(req, res, "Channel not found", 400);
        const { error } = validateChannelSchema(req.body);
        if (error)
            return errorResponse(req, res, error.details[0].message, 400);
        const payload = {
            title: req.body.title,
            User_id: req.body.userId
        };
        const oldChannel = yield Channel.update(payload, {
            where: {
                id: id
            }
        });
        return successResponse(req, res, "Channel updated successfully");
    }
    catch (error) {
        if (error)
            return errorResponse(req, res, error.message, 400);
    }
});
// delete Channel 
exports.deleteChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const channel = yield Channel.findOne({
            where: {
                id: id
            }
        });
        if (!channel)
            return errorResponse(req, res, "Channel not found", 400);
        const oldChannel = yield Channel.destroy({
            where: {
                id: id
            }
        });
        return successResponse(req, res, "Channel deleted successfully");
    }
    catch (error) {
        if (error)
            return errorResponse(req, res, error.message, 400);
    }
});
