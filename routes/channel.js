const express = require('express');
const router = express.Router();

// bring the user contoller 
const {getAllChannels, createChannel, showChannel, deleteChannel, updateChannel} = require('../controllers/channel');

// middleware
const verifyToken = require('../middleware/auth')
router.use(verifyToken)
router.get('/', getAllChannels);
router.get('/:id', showChannel);
router.post('/create', createChannel);
router.put('/update/:id', updateChannel);
router.delete('/delete/:id', deleteChannel);

module.exports = router;
