const express = require('express');
const UserController = require('../controllers/user.controller');
const checkAuthMiddleware = require('../middleware/check-auth')
const router = express.Router();

//Sign Up User
router.post('/sign-up',UserController.signup)
//Login User
router.post('/login',UserController.login)
// Get all users
router.get('/allUser',checkAuthMiddleware.checkAuth, UserController.showAllUser);
router.get('/:id',checkAuthMiddleware.checkAuth, UserController.showSingle);

// Delete User
router.delete('/delete',checkAuthMiddleware.checkAuth, UserController.deleteUser);

module.exports = router;