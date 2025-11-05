import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Auth.css'; // Import the new styles

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="auth-container">
            <div className="auth-card-split">
                {/* Left Branding Panel */}
                <div className="auth-branding-panel">
                    <h1><strong>Welcome Back</strong></h1>
                    <p>Log in to access your dashboard and manage your services.</p>
                </div>

                {/* Right Form Panel */}
                <div className="auth-form-panel">
                    <h2>Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                required 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. you@example.com"
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                required 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=""
                            />
                        </Form.Group>
                        <Button className="w-100 auth-btn" type="submit">Log In</Button>
                    </Form>
                    <div className="auth-footer">
                        Need an account? <Link to="/register">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

