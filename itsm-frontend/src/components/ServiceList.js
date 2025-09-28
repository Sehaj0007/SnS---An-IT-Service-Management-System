import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Spinner, Modal } from 'react-bootstrap'; // 1. Import Modal

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- State for our new Modal ---
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    // ---

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/services');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // --- Functions to handle showing and hiding the modal ---
    const handleShowModal = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedService(null);
    };
    // ---

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <> {/* Use a Fragment to wrap everything */}
            <Row>
                {services.map(service => (
                    <Col md={4} className="mb-4" key={service.serviceId}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{service.serviceName}</Card.Title>
                                <Card.Text>{service.shortDescription}</Card.Text>
                                {/* 2. Update the button to open the modal */}
                                <Button variant="primary" onClick={() => handleShowModal(service)}>
                                    Know More
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 3. Add the Modal component itself */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedService?.serviceName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{selectedService?.shortDescription}</p>
                    {/* You can add more detailed descriptions here in the future */}
                    <p>More detailed information about {selectedService?.serviceName} would go here, explaining the benefits, process, and pricing.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ServiceList;

