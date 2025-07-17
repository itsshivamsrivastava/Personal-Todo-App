import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) { 
            setError('Password must be at least 8 characters long');
            return;
        }

        try {
            await register(username, email, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
            if (err.response?.data?.errors) {
                setError(err.response.data.errors.map(e => e.msg).join(', '));
            }
        }
    };

    return (
        <div className="register-bg">
            <div className="register-container">
                <h2 className="register-title">Register</h2>
                {error && <p className="register-error">{error}</p>}
                <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
                    <Input
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        required
                        icon={<i className="fas fa-user"></i>}
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        icon={<i className="fas fa-envelope"></i>}
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Choose a password (min 8 characters)"
                        required
                        icon={<i className="fas fa-lock"></i>}
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                        icon={<i className="fas fa-lock"></i>}
                    />
                    <Button type="submit">
                        REGISTER
                    </Button>
                </form>
                <div className="register-or">
                    <span>Already have an account?</span>
                </div>
                <Button type='button' onClick={() => navigate('/login')}>LOGIN</Button>
            </div>
        </div>
    );
};

export default RegisterPage;