import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert, InputGroup } from 'react-bootstrap'; // 1. Import InputGroup
import { Link, useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'; // 2. Import icons

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // --- State for password visibility ---
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // ---

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Failed to register.');
            }

            setSuccess('Registration successful! Please log in.');
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '100%', maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        {/* Full Name and Email fields remain the same */}
                        <Form.Group id="fullName" className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" required onChange={(e) => setFullName(e.target.value)} />
                        </Form.Group>
                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        
                        {/* 3. Update Password field */}
                        <Form.Group id="password"  className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        {/* 4. Update Confirm Password field */}
                        <Form.Group id="confirmPassword"  className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Button className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center">
                    Already have an account? <Link to="/login">Log In</Link>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default RegisterPage;

