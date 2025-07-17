import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import Input from '../components/Input';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner'; 
import './CreateEditTodoPage.css';

const CreateEditTodoPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('Non-Urgent'); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchTodo = async () => {
                setLoading(true);
                try {
                    const res = await api.get(`/todos`);
                    const todoToEdit = res.data.find(todo => todo._id === id);

                    if (!todoToEdit) {
                        setError('Todo not found or you do not have permission to edit it.');
                        setLoading(false);
                        return;
                    }

                    setTitle(todoToEdit.title);
                    setDescription(todoToEdit.description || '');
                    setDueDate(todoToEdit.dueDate ? new Date(todoToEdit.dueDate).toISOString().split('T')[0] : '');
                    setCategory(todoToEdit.category || 'Non-Urgent');
                } catch (err) {
                    console.error(err);
                    setError(err.response?.data?.message || 'Failed to load todo for editing.');
                } finally {
                    setLoading(false);
                }
            };
            fetchTodo();
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const todoData = {
            title,
            description,
            dueDate: dueDate || null,
            category
        };

        try {
            if (isEditMode) {
                await api.put(`/todos/${id}`, todoData);
            } else {
                await api.post('/todos', todoData); 
            }
            navigate('/todos');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to save todo.');
            if (err.response?.data?.errors) {
                setError(err.response.data.errors.map(e => e.msg).join(', '));
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error && isEditMode) return <div className="cetodo-error-center">{error}</div>;

    return (
        <div className="cetodo-bg">
            <div className="cetodo-card">
                <h2 className="cetodo-title">{isEditMode ? 'Edit Todo' : 'Create New Todo'}</h2>
                {error && <p className="cetodo-error">{error}</p>}
                <form onSubmit={handleSubmit} className="cetodo-form">
                    <div className="cetodo-input-group">
                        <Input
                            label="Title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Buy groceries"
                            maxLength={100} 
                            required
                        />
                    </div>
                    <div className="cetodo-input-group">
                        <Input
                            label="Description (Optional)"
                            type="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g., Milk, eggs, bread"
                            maxLength={500} 
                        />
                    </div>
                    <div className="cetodo-input-group">
                        <Input
                            label="Due Date (Optional)"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    <div className="cetodo-input-group">
                        <label htmlFor="category" className="cetodo-label">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="cetodo-select"
                        >
                            <option value="Urgent">Urgent</option>
                            <option value="Non-Urgent">Non-Urgent</option>
                        </select>
                    </div>
                    <Button type="submit" className="cetodo-submit-btn">
                        {isEditMode ? 'Update Todo' : 'Create Todo'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateEditTodoPage;