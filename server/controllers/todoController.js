const Todo = require('../models/Todo');
const { validationResult } = require('express-validator');

const createTodo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, dueDate, category } = req.body;

    try {
        const todo = await Todo.create({
            user: req.user._id, 
            title,
            description,
            dueDate,
            category
        });
        res.status(201).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getTodos = async (req, res) => {
    try {
        let todos;
        if (req.user.role === 'admin') {
            todos = await Todo.find({}).populate('user', 'username email'); 
        } else {
            todos = await Todo.find({ user: req.user._id }); 
        }
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTodo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, dueDate, category, completed } = req.body;

    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Check ownership for 'user' role or allow 'admin'
        if (req.user.role === 'user' && todo.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own todos' });
        }

        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.dueDate = dueDate || todo.dueDate;
        todo.category = category || todo.category;
        if (typeof completed === 'boolean') { 
            todo.completed = completed;
        }

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Check ownership for 'user' role or allow 'admin'
        if (req.user.role === 'user' && todo.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own todos' }); 
        }

        await Todo.deleteOne({ _id: req.params.id }); 
        res.json({ message: 'Todo removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};