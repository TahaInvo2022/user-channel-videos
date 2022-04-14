import express from 'express';
const router = express.Router();

// bring the user contoller 
const {getAllUsers, showUser, updateUser, deleteUser} = require('../controllers/user');

// middleware
const verifyToken = require('../middleware/auth');
router.use(verifyToken)



router.get('/', getAllUsers);
router.get('/:id', showUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;
