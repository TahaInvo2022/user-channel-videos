const express = require('express');
const router = express.Router();

// bring the user contoller 
const {getAllUsers, showUser, updateUser, deleteUser} = require('../controllers/user');

// middleware
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, showUser);
router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;
