import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoDashboard from './pages/TodoDashboard';
import CreateEditTodoPage from './pages/CreateEditTodoPage';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import './index.css';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} /> 

                    {/* Protected Routes */}
                    <Route element={<PrivateRoute allowedRoles={['user', 'admin']} />}>
                        <Route path="/todos" element={<TodoDashboard />} />
                        <Route path="/todos/new" element={<CreateEditTodoPage />} />
                        <Route path="/todos/edit/:id" element={<CreateEditTodoPage />} />
                    </Route>

                    {/* Admin Protected Routes */}
                    <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                        <Route path="/admin" element={<AdminDashboard />} /> 
                    </Route>

                    <Route path="/" element={<LoginPage />} /> 
                    <Route path="*" element={<h1 className="text-center mt-20 text-red-500">404 - Page Not Found</h1>} />
                </Routes>
            </AuthProvider>
            <Footer />
        </Router>
    );
}

export default App;