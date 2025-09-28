import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Youtube, Twitter, Instagram, Facebook } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-4 bg-dark text-white">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
                        <h5>Stay Connected</h5>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-4"><Youtube /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-4"><Twitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-4"><Instagram /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4"><Facebook /></a>
                    </Col>
                    <Col md={6} className="text-center text-md-end">
                        <p className="mb-1">&copy; 2025 SnS Solutions | Minor Project by SehajPreet</p>
                        <Nav className="justify-content-center justify-content-md-end">
                            <LinkContainer to="/privacy-policy">
                                <Nav.Link className="text-white-50 px-2">Privacy Policy</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/terms-of-service">
                                <Nav.Link className="text-white-50 px-2">Terms of Service</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

