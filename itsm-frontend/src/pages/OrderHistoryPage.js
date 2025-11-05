import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Card, Spinner, Alert, ListGroup, Badge } from 'react-bootstrap';
import { format } from 'date-fns';
import { formatRupee } from '../utils/formatPrice';

const OrderHistoryPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError('You must be logged in to view your order history.');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:8081/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch order history.');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <Container className="my-5">
  <h2 className="mb-4 text-white"> Your Order History</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {!error && orders.length === 0 ? <Alert variant="info">You have not placed any orders yet.</Alert> : null}
      {orders.map((order) => (
        <Card className="mb-3" key={order.orderId}>
          <Card.Header className="d-flex justify-content-between">
            <div>
              <strong>Order #{order.orderId}</strong>
              <span className="ms-3 text-muted">{format(new Date(order.orderDate), 'MMMM d, yyyy h:mm a')}</span>
            </div>
            <Badge bg="secondary">{order.orderStatus.replace('_', ' ')}</Badge>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {order.items.map((item, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between">
                  <span><strong>{item.componentType}</strong> {item.componentName}</span>
                  <span>{formatRupee(item.price)}</span>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="d-flex justify-content-end fw-bold">
                <span className="me-2">Total</span>
                <span>{formatRupee(order.totalPrice)}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default OrderHistoryPage;
