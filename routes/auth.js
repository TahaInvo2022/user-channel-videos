const express = require('express');
const router = express.Router();

// bring the user contoller 
const {doLogin,registerUser} = require('../controllers/auth');


router.post('/login', doLogin);
router.post('/register', registerUser);

module.exports = router;
