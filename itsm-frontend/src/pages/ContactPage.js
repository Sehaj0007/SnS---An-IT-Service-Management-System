import './ContactPage.css'; // Add this line!
import React, { useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Envelope, Telephone, GeoAlt } from 'react-bootstrap-icons';

const ContactPage = () => {
  const [form, setForm] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ show: false, variant: '', message: '' });

    // Simple validation
    if (!form.email || !form.subject || !form.message) {
      setAlert({ show: true, variant: 'danger', message: 'All fields are required.' });
      return;
    }

    setLoading(true);
    try {
      // replace URL with your actual backend endpoint for contact/suggestions
      const response = await fetch('http://localhost:8081/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setAlert({ show: true, variant: 'success', message: 'Your message has been sent! Thank you for contacting us.' });
        setForm({ email: '', subject: '', message: '' });
      } else {
        const text = await response.text();
        setAlert({ show: true, variant: 'danger', message: text || 'Failed to send. Please try again later.' });
      }
    } catch (error) {
      setAlert({ show: true, variant: 'danger', message: 'Failed to send. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="my-5 contact-bg">
        <h2 className="text-center mb-3 fw-bold">Contact Us</h2>
        <p className="text-center text-muted mb-5 fs-5">
            Have a question or need to book a consultation? Reach out to us!
        </p>
        <Row className="justify-content-center">
            <Col xs={12} md={5} className="mb-4">
            <Card className="h-100 contact-card">
                <Card.Body>
                    <Card.Title className="fw-bold fs-2 mb-3">Get in Touch</Card.Title>
                    <Card.Text className="mb-4">
                        We're here to help with all your IT needs.
                    </Card.Text>
                    <div className="contact-list">
                        <div className="contact-item mb-3 d-flex align-items-center">
                        <div className="contact-icon-lg me-3">
                            <GeoAlt size={26} />
                        </div>
                        <span>Plot: 248, Phase-1, Industrial Area, Chandigarh.</span>
                        </div>
                        <div className="contact-item mb-3 d-flex align-items-center">
                        <div className="contact-icon-lg me-3">
                            <Telephone size={26} />
                        </div>
                        <span>+91 9417497785</span>
                        </div>
                        <div className="contact-item d-flex align-items-center">
                        <div className="contact-icon-lg me-3">
                            <Envelope size={26} />
                        </div>
                        <span>contact@sns-solutions.com</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            </Col>

            <Col xs={12} md={5} className="mb-4">
            <Card className="h-100 contact-card">
                <Card.Body>
                <Card.Title className="fw-bold mb-4 fs-3">Send a Message</Card.Title>

                {alert.show && (
                    <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                    {alert.message}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit} autoComplete="off" className="contact-form">
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label className="contact-form-label">Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    </Form.Group>
                    <Form.Group controlId="formBasicSubject">
                    <Form.Label className="contact-form-label">Subject</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    </Form.Group>
                    <Form.Group controlId="formBasicMessage">
                    <Form.Label className="contact-form-label">Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    </Form.Group>
                    <div className="text-end mt-4">
                    <Button variant="primary" className="contact-btn" type="submit" disabled={loading}>
                        {loading ? <Spinner as="span" size="sm" animation="border" /> : "Submit"}
                    </Button>
                    </div>
                </Form>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </Container>
  );
};

export default ContactPage;
