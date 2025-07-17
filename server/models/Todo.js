const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    title: {
        type: String,
        required: true, 
        maxlength: 100 
    },
    description: {
        type: String,
        maxlength: 500 
    },
    dueDate: {
        type: Date 
    },
    category: {
        type: String,
        enum: ['Urgent', 'Non-Urgent'],
        required: true
    },
    completed: {
        type: Boolean,
        default: false 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

TodoSchema.index({ user: 1 });

module.exports = mongoose.model('Todo', TodoSchema);