import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Spinner, Alert, Table } from 'react-bootstrap';
import { format } from 'date-fns';

const AdminDashboardPage = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setError("Admin token not found.");
                setLoading(false);
                return;
            }
            try {
                const [ordersRes, appointmentsRes] = await Promise.all([
                    fetch('http://localhost:8081/api/admin/orders', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:8081/api/admin/appointments', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                if (!ordersRes.ok || !appointmentsRes.ok) {
                    throw new Error('Failed to fetch admin data.');
                }

                const ordersData = await ordersRes.json();
                const appointmentsData = await appointmentsRes.json();

                setOrders(ordersData);
                setAppointments(appointmentsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    if (loading) {
        return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
    }

    return (
        <Container fluid className="my-5">
            <h2 className="mb-4">Admin Dashboard</h2>
            <Row>
                <Col lg={12} className="mb-4">
                    <Card>
                        <Card.Header as="h5">All Customer Orders</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer Email</th>
                                        <th>Order Date</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.orderId}>
                                            <td>{order.orderId}</td>
                                            <td>{order.userEmail}</td> {/* This will now work */}
                                            <td>{format(new Date(order.orderDate), 'MMM d, yyyy')}</td>
                                            <td>${order.totalPrice.toFixed(2)}</td>
                                            <td>{order.orderStatus.replace('_', ' ')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={12}>
                    <Card>
                        <Card.Header as="h5">All Consultancy Appointments</Card.Header>
                        <Card.Body>
                             <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Appt ID</th>
                                        <th>Client Name</th>
                                        <th>Client Email</th>
                                        <th>Preferred Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(appt => (
                                        <tr key={appt.appointmentId}>
                                            <td>{appt.appointmentId}</td>
                                            <td>{appt.clientName}</td>
                                            <td>{appt.clientEmail}</td>
                                            <td>{format(new Date(appt.preferredDate), 'MMM d, yyyy')}</td>
                                            <td>{appt.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboardPage;
