import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Row, Col, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { formatRupee } from '../utils/formatPrice';

const DEFAULT_PLACEHOLDER = '/images/components/placeholder.svg';

const categoryDisplayMap = {
  Power_Supply: 'Power Supply',
  Sound_Card: 'Sound Card',
  WiFi_Card: 'WiFi Card',
  UPS: 'UPS',
  CPU: 'CPU',
  GPU: 'GPU',
  RAM: 'RAM',
  Storage: 'Storage',
  Motherboard: 'Motherboard',
  Case: 'Case',
  Cooler: 'Cooler',
  Monitor: 'Monitor',
  Keyboard: 'Keyboard',
  Mouse: 'Mouse',
  Fan: 'Fan',
  Other: 'Other'
};
function displayCategory(type) {
  return categoryDisplayMap[type] || type.replace(/_/g, ' ');
}

const PcBuilder = () => {
  const [components, setComponents] = useState({});
  const [selectedComponents, setSelectedComponents] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/components');
        const data = await response.json();
        const grouped = data.reduce((acc, component) => {
          acc[component.componentType] = acc[component.componentType] || [];
          acc[component.componentType].push(component);
          return acc;
        }, {});
        setComponents(grouped);
      } catch (error) {
        setError('Could not load components. Please try again later.');
      } finally {
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
    setSelectedComponents((prev) => ({
      ...prev,
      [component.componentType]: component,
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
      componentIds: Object.values(selectedComponents).map((c) => c.componentId),
      shippingAddress: '123 Test Street',
    };
    try {
      const response = await fetch('http://localhost:8081/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(orderRequest),
      });
      if (response.ok) {
        setMessage('Order placed successfully!');
        setSelectedComponents({});
      } else {
        const errorData = await response.text();
        setError('Failed to place order: ' + errorData);
      }
    } catch (error) {
      setError('An error occurred while placing the order.');
    }
  };

  // Remove a selected component by its component type (e.g., 'CPU', 'GPU')
  const handleRemoveComponent = (componentType) => {
    setSelectedComponents((prev) => {
      const copy = { ...prev };
      delete copy[componentType];
      return copy;
    });
  };

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading components...</span>
        </Spinner>
      </div>
    );

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = DEFAULT_PLACEHOLDER;
  };

  const getImageSrc = (imageUrl) => {
    if (!imageUrl) return DEFAULT_PLACEHOLDER;
    let trimmed = String(imageUrl).trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    trimmed = trimmed.replace(/^\.\//, '');
    trimmed = trimmed.replace(/^images\//i, '');
    if (!trimmed.startsWith('/')) trimmed = `/${trimmed}`;
    if (/^\/components\//i.test(trimmed)) trimmed = `/images${trimmed}`;
    if (/^\/images\/components\//i.test(trimmed)) return trimmed;
    if (/^\/[^/]+\.[a-zA-Z0-9]{1,5}$/.test(trimmed)) return `/images/components${trimmed}`;
    return `/images/components${trimmed}`;
  };

  return (
    <Row>
      <Col md={8}>
        {error && !message && <Alert variant="danger">{error}</Alert>}
        <Accordion defaultActiveKey="0">
          {Object.keys(components).map((type, index) => (
            <Accordion.Item eventKey={String(index)} key={type}>
              <Accordion.Header>{displayCategory(type)}</Accordion.Header>
              <Accordion.Body>
                  {Array.from(
                    new Map(
                      components[type].map(obj => [obj.componentName + obj.description, obj])
                    ).values()
                  ).map((component) => {
                    const imgSrc = getImageSrc(component.imageUrl);
                    return (
                      <Card key={component.componentId} className="mb-2">
                        <Card.Body className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <img
                              src={imgSrc}
                              alt={component.componentName}
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: 'cover',
                                marginRight: 16,
                                borderRadius: 7,
                                background: '#f5f5f5',
                                border: '2px solid #ccc',
                                padding: 4,
                                boxSizing: 'border-box',
                                display: 'block',
                              }}
                              loading="lazy"
                              onError={handleImgError}
                            />
                            <div>
                              <Card.Title>{component.componentName}</Card.Title>
                              <Card.Text>{component.description}</Card.Text>
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="fw-bold fs-5 mb-2">{formatRupee(component.price)}</div>
                            <Button
                              variant={selectedComponents[type]?.componentId === component.componentId ? 'success' : 'primary'}
                              onClick={() => handleSelectComponent(component)}
                            >
                              {selectedComponents[type]?.componentId === component.componentId ? 'Selected' : 'Select'}
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })}
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
            {Object.keys(selectedComponents).length === 0 ? (
              <p>No components selected yet.</p>
            ) : (
              <ListGroup variant="flush">
                {Object.entries(selectedComponents).map(([type, component]) => (
                  <ListGroup.Item key={component.componentId} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{displayCategory(type)}:</strong> {component.componentName}
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="me-3">{formatRupee(component.price)}</span>
                      <Button
                        variant="link"
                        className="p-0 text-danger"
                        onClick={() => handleRemoveComponent(type)}
                        aria-label={`Remove ${displayCategory(type)}`}
                        title={`Remove ${displayCategory(type)}`}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>{formatRupee(totalPrice)}</span>
            </div>
            <div className="d-grid mt-3">
              <Button variant="primary" size="lg" onClick={handlePlaceOrder}>
                Place Order
              </Button>
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
