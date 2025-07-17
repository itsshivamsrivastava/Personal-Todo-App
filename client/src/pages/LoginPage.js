import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(identifier, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-bg">
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                {error && <p className="login-error">{error}</p>}
                <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                    <Input
                        label="Email or Username"
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Type your username"
                        required
                        icon={<i className="fas fa-user"></i>}
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Type your password"
                        required
                        icon={<i className="fas fa-lock"></i>}
                    />
                    <div className="login-forgot-row">
                        <Link to="#" className="login-forgot">Forgot password?</Link>
                    </div>
                    <Button type="submit">
                        LOGIN
                    </Button>
                </form>
                <div className="login-or">Or Sign Up Using</div>
                <div className="login-social-row">
                    <Link to="#" className="login-social login-facebook"><i className="fab fa-facebook-f"></i></Link>
                    <Link to="#" className="login-social login-twitter"><i className="fab fa-twitter"></i></Link>
                    <Link to="#" className="login-social login-google"><i className="fab fa-google"></i></Link>
                </div>
                <div className="login-or">
                        <span>Don't have an account?</span>
                    </div>
                    <Button type='button' onClick={() => navigate('/register')}>SIGN UP</Button>
            </div>
        </div>
    );
};

export default LoginPage;