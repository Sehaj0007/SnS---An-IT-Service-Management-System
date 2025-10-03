import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Spinner, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const AppointmentForm = () => {
    const { user, token } = useAuth();

    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        preferredDate: '',
        preferredTime: 'Morning (9am-12pm)',
        issueDescription: ''
    });

    const [status, setStatus] = useState({
        loading: false,
        error: null,
        success: null,
    });

    // Pre-fill form with logged-in user's details
    useEffect(() => {
        if (user) {
            setFormData(prevData => ({
                ...prevData,
                clientName: user.name || '',
                clientEmail: user.email || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, success: null });

        try {
            const response = await fetch('http://localhost:8081/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Something went wrong. Please try again.');
            }

            setStatus({ loading: false, success: 'Appointment booked successfully! We will contact you shortly.', error: null });
            
            // Clear only the user-editable fields
            setFormData(prevData => ({
                ...prevData,
                clientPhone: '',
                preferredDate: '',
                preferredTime: 'Morning (9am-12pm)',
                issueDescription: ''
            }));

        } catch (error) {
            setStatus({ loading: false, error: error.message, success: null });
        }
    };

    return (
        // Use Bootstrap's Container for proper alignment and padding
        <Container className="my-5 p-4 bg-light rounded shadow-sm">
            <h2 className="text-center mb-4">Book a Consultancy Appointment</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formGridName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="clientName" 
                            value={formData.clientName} 
                            onChange={handleChange} 
                            placeholder="Enter your name" 
                            required 
                            //disabled={!!user} // Disable if user is logged in
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="clientEmail" 
                            value={formData.clientEmail} 
                            onChange={handleChange} 
                            placeholder="Enter your email" 
                            required 
                            disabled={!!user} // Disable if user is logged in
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="formGridPhone">
                        <Form.Label>Phone Number (Optional)</Form.Label>
                        <Form.Control type="tel" name="clientPhone" value={formData.clientPhone} onChange={handleChange} placeholder="Phone number" />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="formGridDate">
                        <Form.Label>Preferred Date</Form.Label>
                        <Form.Control type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="formGridTime">
                        <Form.Label>Preferred Time</Form.Label>
                        <Form.Select name="preferredTime" value={formData.preferredTime} onChange={handleChange}>
                            <option>Morning (9am-12pm)</option>
                            <option>Afternoon (1pm-4pm)</option>
                            <option>Evening (5pm-7pm)</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridDescription">
                    <Form.Label>Briefly describe your issue</Form.Label>
                    <Form.Control as="textarea" name="issueDescription" value={formData.issueDescription} onChange={handleChange} rows={4} required placeholder="Describe the issue you are facing..."/>
                </Form.Group>

                <div className="text-center">
                    <Button variant="primary" type="submit" disabled={status.loading} style={{ padding: '10px 20px' }}>
                        {status.loading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                {' '}Booking...
                            </>
                        ) : 'Book Appointment'}
                    </Button>
                </div>
            </Form>

            <div className="mt-4">
                {status.success && <Alert variant="success">{status.success}</Alert>}
                {status.error && <Alert variant="danger">{status.error}</Alert>}
            </div>
        </Container>
    );
};

export default AppointmentForm;

