import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; // Corrected import path
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '100%', maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group id="password"  className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button className="w-100" type="submit">Log In</Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center">
                    Need an account? <Link to="/register">Sign Up</Link>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default LoginPage;

