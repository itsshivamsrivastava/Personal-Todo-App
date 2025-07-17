const User = require('../models/User');
const Todo = require('../models/Todo');
const { validationResult } = require('express-validator');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); 
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUserRole = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { role } = req.body;

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role provided. Must be "user" or "admin".' });
        }

        user.role = role;
        await user.save();

        res.json({ message: 'User role updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllTodosAdmin = async (req, res) => {
    try {
        const todos = await Todo.find({}).populate('user', 'username email');
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    getAllUsers,
    updateUserRole,
    getAllTodosAdmin
};