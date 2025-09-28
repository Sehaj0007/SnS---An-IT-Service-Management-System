import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Row, Col, ListGroup, Alert, Spinner } from 'react-bootstrap'; // Import Spinner
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PcBuilder = () => {
    const [components, setComponents] = useState({});
    const [selectedComponents, setSelectedComponents] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    // 1. Add loading state
    const [loading, setLoading] = useState(true); 

    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/components');
                const data = await response.json();
                const grouped = data.reduce((acc, component) => {
                    (acc[component.componentType] = acc[component.componentType] || []).push(component);
                    return acc;
                }, {});
                setComponents(grouped);
            } catch (error) {
                console.error("Failed to fetch components:", error);
                setError('Could not load components. Please try again later.');
            } finally {
                // 3. Set loading to false after fetch is complete
                setLoading(false);
            }
        };

        fetchComponents();
    }, []);

    useEffect(() => {
        const newTotal = Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0);
        setTotalPrice(newTotal);
    }, [selectedComponents]);

    const handleSelectComponent = (component) => {
        setSelectedComponents(prev => ({
            ...prev,
            [component.componentType]: component
        }));
    };

    const handlePlaceOrder = async () => {
        setMessage('');
        setError('');

        if (!user) {
            navigate('/login');
            return;
        }

        if (Object.keys(selectedComponents).length === 0) {
            setError('Please select at least one component to place an order.');
            return;
        }

        const orderRequest = {
            componentIds: Object.values(selectedComponents).map(c => c.componentId),
            shippingAddress: "123 Test Street" // Hardcoded for now
        };

        try {
            const response = await fetch('http://localhost:8081/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderRequest)
            });

            if (response.ok) {
                setMessage('Order placed successfully!');
                setSelectedComponents({});
            } else {
                const errorData = await response.text();
                setError(`Failed to place order: ${errorData}`);
            }
        } catch (error) {
            setError('An error occurred while placing the order.');
            console.error("Order placement error:", error);
        }
    };
    
    // 2. Conditionally render spinner
    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading components...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Row>
            <Col md={8}>
                {error && !message && <Alert variant="danger">{error}</Alert>}
                <Accordion defaultActiveKey="0">
                    {Object.keys(components).map((type, index) => (
                        <Accordion.Item eventKey={String(index)} key={type}>
                            <Accordion.Header>{type}</Accordion.Header>
                            <Accordion.Body>
                                {components[type].map(component => (
                                    <Card key={component.componentId} className="mb-2">
                                        <Card.Body className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <Card.Title>{component.componentName}</Card.Title>
                                                <Card.Text>{component.description}</Card.Text>
                                            </div>
                                            <div className="text-end">
                                                <div className="fw-bold fs-5 mb-2">${component.price.toFixed(2)}</div>
                                                <Button
                                                    variant={selectedComponents[type]?.componentId === component.componentId ? "success" : "primary"}
                                                    onClick={() => handleSelectComponent(component)}
                                                >
                                                    {selectedComponents[type]?.componentId === component.componentId ? "Selected" : "Select"}
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Col>

            <Col md={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>Your Build</Card.Title>
                        <hr />
                        {Object.keys(selectedComponents).length > 0 ? (
                            <ListGroup variant="flush">
                                {Object.entries(selectedComponents).map(([type, component]) => (
                                    <ListGroup.Item key={component.componentId} className="d-flex justify-content-between">
                                        <span><strong>{type}:</strong> {component.componentName}</span>
                                        <span>${component.price.toFixed(2)}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>No components selected yet.</p>
                        )}
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="d-grid mt-3">
                            <Button variant="primary" size="lg" onClick={handlePlaceOrder}>Place Order</Button>
                        </div>
                        {message && <Alert variant="success" className="mt-3">{message}</Alert>}
                        {error && !message && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default PcBuilder;

