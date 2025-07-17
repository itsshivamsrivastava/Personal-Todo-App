import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                // Check if token is expired
                if (decodedUser.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setUser(null);
                } else {
                    setUser(decodedUser);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const login = async (identifier, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { identifier, password });
            localStorage.setItem('token', res.data.token);
            const decodedUser = jwtDecode(res.data.token);
            setUser(decodedUser);
            navigate('/todos');
        } catch (err) {
            console.error(err.response ? err.response.data.message : err.message);
            throw err; 
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            localStorage.setItem('token', res.data.token);
            const decodedUser = jwtDecode(res.data.token);
            setUser(decodedUser);
            navigate('/todos');
        } catch (err) {
            console.error(err.response ? err.response.data.message : err.message);
            throw err; 
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);