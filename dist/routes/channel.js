"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// bring the user contoller 
const { getAllChannels, createChannel, showChannel, deleteChannel, updateChannel } = require('../controllers/channel');
// middleware
const verifyToken = require('../middleware/auth');
router.use(verifyToken);
router.get('/', getAllChannels);
router.get('/:id', showChannel);
router.post('/create', createChannel);
router.put('/update/:id', updateChannel);
router.delete('/delete/:id', deleteChannel);
module.exports = router;
