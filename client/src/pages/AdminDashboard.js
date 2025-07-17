import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner'; 
import TodoCard from '../components/TodoCard';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [todos, setTodos] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingTodos, setLoadingTodos] = useState(true);
    const [errorUsers, setErrorUsers] = useState('');
    const [errorTodos, setErrorTodos] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchAllTodosForAdmin();
    }, []);

    const fetchUsers = async () => {
        setLoadingUsers(true);
        setErrorUsers('');
        try {
            const res = await api.get('/admin/users');  
            setUsers(res.data);
        } catch (err) {
            console.error(err);
            setErrorUsers(err.response?.data?.message || 'Failed to fetch users.');
        } finally {
            setLoadingUsers(false);
        }
    };

    const fetchAllTodosForAdmin = async () => {
        setLoadingTodos(true);
        setErrorTodos('');
        try {
            const res = await api.get('/admin/todos'); 
            setTodos(res.data);
        } catch (err) {
            console.error(err);
            setErrorTodos(err.response?.data?.message || 'Failed to fetch all todos.');
        } finally {
            setLoadingTodos(false);
        }
    };

    const handleChangeUserRole = async (userId, currentRole) => {
        const newRole = currentRole === 'user' ? 'admin' : 'user';
        if (window.confirm(`Are you sure you want to change user role to ${newRole}?`)) {
            try {
                await api.patch(`/admin/users/${userId}/role`, { role: newRole }); 
                fetchUsers(); 
            } catch (err) {
                console.error(err);
                setErrorUsers(err.response?.data?.message || 'Failed to update user role.');
            }
        }
    };

    const handleToggleComplete = async (id, currentStatus) => {
        try {
            const res = await api.put(`/todos/${id}`, { completed: !currentStatus });
            setTodos(todos.map(todo => todo._id === id ? res.data : todo));
        } catch (err) {
            console.error(err);
            setErrorTodos(err.response?.data?.message || 'Failed to update todo status.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            try {
                await api.delete(`/todos/${id}`);
                setTodos(todos.filter(todo => todo._id !== id));
            } catch (err) {
                console.error(err);
                setErrorTodos(err.response?.data?.message || 'Failed to delete todo.');
            }
        }
    };

    return (
        <div className="admin-bg">
            <div className="admin-container">
                <h1 className="admin-title">Admin Dashboard</h1>
                {/* Users Management */}
                <div className="admin-card">
                    <h2 className="admin-section-title">All Users</h2>
                    {errorUsers && <p className="admin-error">{errorUsers}</p>}
                    {loadingUsers ? (
                        <LoadingSpinner />
                    ) : users.length === 0 ? (
                        <p className="admin-empty">No users found.</p>
                    ) : (
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(userItem => (
                                        <tr key={userItem._id}>
                                            <td>{userItem._id}</td>
                                            <td>{userItem.username}</td>
                                            <td>{userItem.email}</td>
                                            <td>{userItem.role}</td>
                                            <td>
                                                <Button
                                                    onClick={() => handleChangeUserRole(userItem._id, userItem.role)}
                                                    className={`admin-role-btn ${userItem.role === 'user' ? 'admin-promote' : 'admin-demote'}`}
                                                >
                                                    {userItem.role === 'user' ? 'Promote to Admin' : 'Demote to User'}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {/* Todos Management */}
                <div className="admin-card">
                    <h2 className="admin-section-title">All Todos (Admin View)</h2>
                    {errorTodos && <p className="admin-error">{errorTodos}</p>}
                    {loadingTodos ? (
                        <LoadingSpinner />
                    ) : todos.length === 0 ? (
                        <p className="admin-empty">No todos found across all users.</p>
                    ) : (
                        <div className="admin-todos-grid">
                            {todos.map(todo => (
                                <div className="admin-todo-card" key={todo._id}>
                                    <TodoCard
                                        todo={todo}
                                        isAdminView={true}
                                        onToggleComplete={handleToggleComplete}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;