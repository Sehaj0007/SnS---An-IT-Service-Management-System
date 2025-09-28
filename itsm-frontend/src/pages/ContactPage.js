import React from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Envelope, Telephone, GeoAlt } from 'react-bootstrap-icons';

const ContactPage = () => {
    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Contact Us</h2>
            <p className="text-center text-muted mb-5">
                Have a question or need to book a consultation? Reach out to us!
            </p>
            <Row>
                <Col md={6} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title>Get in Touch</Card.Title>
                            <Card.Text>
                                We're here to help with all your IT needs.
                            </Card.Text>
                            <p><GeoAlt className="me-2" /> Phase-1, Industrial Area, Chandigarh.</p>
                            <p><Telephone className="me-2" /> +91 1234567890</p>
                            <p><Envelope className="me-2" /> contact@sns-solutions.com</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    {/* You can reuse your AppointmentForm here if you wish, or use a simpler form */}
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title>Send a Message</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicSubject">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" placeholder="Subject" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicMessage">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactPage;

