const express = require('express');
const { getAllUsers, updateUserRole, getAllTodosAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { body } = require('express-validator');

const router = express.Router();

router.route('/users')
    .get(protect, authorizeRoles('admin'), getAllUsers); 

router.route('/users/:id/role')
    .patch(
        protect,
        authorizeRoles('admin'),
        [
            body('role', 'Role is required').not().isEmpty(),
            body('role', 'Invalid role').isIn(['user', 'admin'])
        ],
        updateUserRole
    );

router.route('/todos')
    .get(protect, authorizeRoles('admin'), getAllTodosAdmin); 

module.exports = router;