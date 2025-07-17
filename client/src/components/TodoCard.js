import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import './TodoCard.css';

const TodoCard = ({ todo, onDelete, onToggleComplete, isAdminView = false }) => {
    const { user } = useAuth();
    const isOwner = user && todo.user && user.id === todo.user._id; 

    return (
        <div className={`todo-card${todo.completed ? ' todo-completed' : ''}`}> 
            <div>
                <h3 className="todo-title">{todo.title}</h3>
                {isAdminView && todo.user && (
                    <p className="todo-meta">Created by: {todo.user.username} ({todo.user.email})</p>
                )}
                <div className="todo-desc">{todo.description}</div>
            </div>
            <div className="todo-card-footer">
                <div className="todo-meta-row">
                    <span className="todo-meta">Due: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'N/A'}</span>
                    <span className={`todo-category ${todo.category === 'Urgent' ? 'urgent' : 'non-urgent'}`}>{todo.category}</span>
                </div>
                <div className="todo-actions-row">
                    {user && (user.role === 'admin' || isOwner) && (
                        <>
                            <Link to={`/todos/edit/${todo._id}`}>
                                <Button className="todo-edit-btn">Edit</Button>
                            </Link>
                            <Link>
                                <Button onClick={() => onDelete(todo._id)} className="todo-edit-btn">Delete</Button>
                            </Link>
                        </>
                    )}
                    <label className="todo-checkbox-label" title="Mark as completed">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggleComplete(todo._id, todo.completed)}
                            className="todo-checkbox"
                        />
                        <span className="todo-checkbox-text">Done</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default TodoCard;