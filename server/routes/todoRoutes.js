const express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

const router = express.Router();

router.route('/')
    .post(
        protect,
        [
            body('title', 'Title is required').not().isEmpty(), 
            body('title', 'Title cannot exceed 100 characters').isLength({ max: 100 }),
            body('description', 'Description cannot exceed 500 characters').isLength({ max: 500 }), 
            body('category', 'Category is required and must be Urgent or Non-Urgent').isIn(['Urgent', 'Non-Urgent'])
        ],
        createTodo
    )
    .get(protect, getTodos);

router.route('/:id')
    .put(
        protect,
        [
            body('title', 'Title cannot exceed 100 characters').optional().isLength({ max: 100 }),
            body('description', 'Description cannot exceed 500 characters').optional().isLength({ max: 500 }),
            body('category', 'Category must be Urgent or Non-Urgent').optional().isIn(['Urgent', 'Non-Urgent'])
        ],
        updateTodo
    )
    .delete(protect, deleteTodo);

module.exports = router;