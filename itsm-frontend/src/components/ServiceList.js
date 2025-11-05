import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Spinner, Modal, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Tools, CodeSlash, PcDisplay, Wifi, ShieldLock, WindowStack } from 'react-bootstrap-icons';

// --- Icon mapping for services ---
const serviceIcons = {
  "Software Solutions": <CodeSlash size={50} className="text-primary mb-3" />,
  "Hardware Repairs": <Tools size={50} className="text-primary mb-3" />,
  "Custom PC Building": <PcDisplay size={50} className="text-primary mb-3" />,
  "Networking Solutions": <Wifi size={50} className="text-primary mb-3" />,
  "Security Services": <ShieldLock size={50} className="text-primary mb-3" />,
  "OS Installation": <WindowStack size={50} className="text-primary mb-3" />,
  "default": <CodeSlash size={50} className="text-primary mb-3" />
};

const defaultServiceImg = "/images/services/service_default.svg";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

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

  const handleShowModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

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
    <>
      <style type="text/css">
        {`
          .service-card {
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            border: none;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          }
          .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          }
          @media (min-width: 576px) {
            .service-modal-custom {
              min-width: 700px;
              max-width: 900px;
            }
          }
          .service-img {
            width: 180px;
            height: 180px;
            object-fit: contain;
            border-radius: 15px;
            box-shadow: 0 2px 16px #d5e7ff30;
            background: #f4f9ff;
          }
        `}
      </style>
      <Row>
        {services.map(service => (
          <Col md={6} lg={4} className="mb-4" key={service.serviceId}>
            <Card className="h-100 text-center service-card">
              <Card.Body className="d-flex flex-column justify-content-between p-4">
                <div>
                  {serviceIcons[service.serviceName] || serviceIcons.default}
                  <Card.Title as="h4" className="fw-normal">{service.serviceName}</Card.Title>
                  <Card.Text className="text-muted">{service.shortDescription}</Card.Text>
                </div>
                <div className="mt-4">
                  {service.serviceName === 'Custom PC Building' ? (
                    <Button as={Link} to="/custom-pc" variant="primary">Build Your PC</Button>
                  ) : (
                    <Button variant="outline-primary" onClick={() => handleShowModal(service)}>
                      Know More
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for "Know More" details */}
      <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName="service-modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>{selectedService?.serviceName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              background: 'linear-gradient(135deg, #e0edff 60%, #f7fafc 100%)',
              borderRadius: '1.25rem',
              boxShadow: '0 8px 24px 2px rgba(0,80,180,0.08)',
              padding: '2rem 1.5rem',
              border: '1px solid #eaf2fb'
            }}
            className="mb-2"
          >
            <Row>
              <Col xs={12} md={7}>
                <div className="d-flex align-items-center mb-3">
                  {serviceIcons[selectedService?.serviceName] || serviceIcons.default}
                  <h4 className="fw-bold mb-0 ms-3 text-primary">
                    {selectedService?.serviceName}
                  </h4>
                </div>
                <hr />
                <div className="mb-3" style={{ fontSize: 18, lineHeight: 1.6 }}>
                  {selectedService?.longDescription || selectedService?.shortDescription}
                </div>
                <ul className="list-unstyled px-1 mb-0" style={{ fontSize: 16 }}>
                  {selectedService?.bullets &&
                    selectedService.bullets.map((pt, idx) => (
                      <li key={idx} className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {pt}
                      </li>
                    ))}
                </ul>
                <div className="mt-4 text-end">
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 fw-medium shadow-sm">
                    Fully Managed & Support Included
                  </span>
                </div>
              </Col>
              <Col xs={12} md={5} className="d-flex align-items-center justify-content-center">
                <Image
                  src={selectedService?.imageUrl || defaultServiceImg}
                  className="service-img"
                  alt={selectedService?.serviceName + " illustration"}
                  rounded
                />
              </Col>
            </Row>
          </div>
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
