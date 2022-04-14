"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// bring the user contoller 
const { doLogin, registerUser } = require('../controllers/auth');
router.post('/login', doLogin);
router.post('/register', registerUser);
module.exports = router;
