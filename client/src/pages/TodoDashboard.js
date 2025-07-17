import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TodoCard from '../components/TodoCard';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';  
import './TodoDashboard.css';

const TodoDashboard = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const [viewAll, setViewAll] = useState(false); 
    const [filterCompleted, setFilterCompleted] = useState('all'); 
    const [searchTerm, setSearchTerm] = useState(''); 

    const fetchTodos = async () => {
        setLoading(true);
        setError('');
        try {
            let endpoint = '/todos';
            if (user && user.role === 'admin' && viewAll) {
                endpoint = '/admin/todos'; 
            }
            const res = await api.get(endpoint);
            let filteredTodos = res.data;

            if (filterCompleted === 'completed') {
                filteredTodos = filteredTodos.filter(todo => todo.completed);
            } else if (filterCompleted === 'incomplete') {
                filteredTodos = filteredTodos.filter(todo => !todo.completed);
            }

            // Apply search filter 
            if (searchTerm) {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                filteredTodos = filteredTodos.filter(todo =>
                    todo.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                    (todo.description && todo.description.toLowerCase().includes(lowerCaseSearchTerm)) ||
                    (todo.category && todo.category.toLowerCase().includes(lowerCaseSearchTerm))
                );
            }

            setTodos(filteredTodos);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to fetch todos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos(); // eslint-disable-next-line
    }, [user, viewAll, filterCompleted, searchTerm]); 

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            try {
                await api.delete(`/todos/${id}`);
                setTodos(todos.filter(todo => todo._id !== id));
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to delete todo.');
            }
        }
    };

    const handleToggleComplete = async (id, currentStatus) => {
        try {
            const res = await api.put(`/todos/${id}`, { completed: !currentStatus });
            setTodos(todos.map(todo => todo._id === id ? res.data : todo));
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to update todo status.');
        }
    };

    return (
        <div className="todo-bg">
            <div className="todo-container">
                <h1 className="todo-title">Todo Dashboard</h1>
                <div className="todo-controls">
                    <Link to="/todos/new">
                        <Button className="todo-create-btn">Create New Todo</Button>
                    </Link>
                    {user && user.role === 'admin' && (
                        <Link>
                        <Button
                            onClick={() => setViewAll(!viewAll)}
                            className="todo-viewall-btn"
                        >
                            {viewAll ? 'View My Todos' : 'View All Users\' Todos'} 
                        </Button>
                        </Link>
                    )}
                </div>
                <div className="todo-filters">
                    <input
                        type="text"
                        placeholder="Search todos by title, description, or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="todo-search"
                    />
                    <select
                        value={filterCompleted}
                        onChange={(e) => setFilterCompleted(e.target.value)}
                        className="todo-select"
                    >
                        <option value="all">All Todos</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                </div>
                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <p className="todo-error">{error}</p>
                ) : todos.length === 0 ? (
                    <p className="todo-empty">No todos found. Create one!</p>
                ) : (
                    <div className="todo-grid">
                        {todos.map(todo => (
                            <TodoCard
                                key={todo._id}
                                todo={todo}
                                onDelete={handleDelete}
                                onToggleComplete={handleToggleComplete}
                                isAdminView={user && user.role === 'admin' && viewAll} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoDashboard;