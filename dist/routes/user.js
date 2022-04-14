"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// bring the user contoller 
const { getAllUsers, showUser, updateUser, deleteUser } = require('../controllers/user');
// middleware
const verifyToken = require('../middleware/auth');
router.use(verifyToken);
router.get('/', getAllUsers);
router.get('/:id', showUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
module.exports = router;
