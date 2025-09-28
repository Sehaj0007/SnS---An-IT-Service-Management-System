import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const AppointmentForm = () => {
    // State to hold all the form data in one object
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        preferredDate: '',
        preferredTime: 'Morning (9am-12pm)', // Default value
        issueDescription: ''
    });

    // State to manage submission status (e.g., loading, success, error)
    const [status, setStatus] = useState({
        loading: false,
        error: null,
        success: null,
    });

    // A single handler to update the formData state for any input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default browser form submission
        setStatus({ loading: true, error: null, success: null });

        try {
            const response = await fetch('http://localhost:8081/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // If the server responds with an error status, throw an error
                throw new Error('Something went wrong. Please try again.');
            }

            // const result = await response.json(); // Optional: use the returned data if needed
            setStatus({ loading: false, success: 'Appointment booked successfully! We will contact you shortly.', error: null });
            
            // Clear the form on successful submission
            setFormData({
                clientName: '',
                clientEmail: '',
                clientPhone: '',
                preferredDate: '',
                preferredTime: 'Morning (9am-12pm)',
                issueDescription: ''
            });

        } catch (error) {
            setStatus({ loading: false, error: error.message, success: null });
        }
    };

    return (
        <div className="my-5 p-4 bg-light rounded">
            <h2 className="text-center mb-4">Book a Consultancy Appointment</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Enter your name" required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} placeholder="Enter your email" required />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Phone Number (Optional)</Form.Label>
                        <Form.Control type="tel" name="clientPhone" value={formData.clientPhone} onChange={handleChange} placeholder="Phone number" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDate">
                        <Form.Label>Preferred Date</Form.Label>
                        <Form.Control type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridTime">
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
                    <Form.Control as="textarea" name="issueDescription" value={formData.issueDescription} onChange={handleChange} rows={3} required />
                </Form.Group>

                <div className="text-center">
                    <Button variant="primary" type="submit" disabled={status.loading}>
                        {status.loading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                {' '}Booking...
                            </>
                        ) : 'Book Appointment'}
                    </Button>
                </div>
            </Form>

            {/* Display Success or Error Messages */}
            <div className="mt-3">
                {status.success && <Alert variant="success">{status.success}</Alert>}
                {status.error && <Alert variant="danger">{status.error}</Alert>}
            </div>
        </div>
    );
};

export default AppointmentForm;
