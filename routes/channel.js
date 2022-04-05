const express = require('express');
const router = express.Router();

// bring the user contoller 
const {getAllChannels, createChannel, showChannel, deleteChannel, updateChannel} = require('../controllers/channel');

// middleware
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken, getAllChannels);
router.get('/:id', verifyToken, showChannel);
router.post('/create', verifyToken, createChannel);
router.put('/update/:id', verifyToken, updateChannel);
router.delete('/delete/:id', verifyToken, deleteChannel);

module.exports = router;
