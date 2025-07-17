const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { body } = require('express-validator'); 

const router = express.Router();

router.post(
    '/register',
    [
        body('username', 'Username is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail(), 
        body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }) 
    ],
    registerUser
);

router.post(
    '/login',
    [
        body('identifier', 'Email or Username is required').not().isEmpty(),
        body('password', 'Password is required').not().isEmpty()
    ],
    loginUser
);

module.exports = router;