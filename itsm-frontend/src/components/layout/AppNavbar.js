import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { HouseDoor, PcDisplay, InfoCircle, Envelope, Tools } from 'react-bootstrap-icons';

const AppNavbar = () => {
    const { user, logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        console.log("Navbar received user object:", user);
    }, [user]);

    const isAdmin = user && user.role === 'ROLE_ADMIN';

    const handleLogout = () => {
        logout();
        setShowLogoutModal(false);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
                <Container>
                    {/* Brand name on the far left */}
                    <LinkContainer to="/">
                        <Navbar.Brand>System & Solutions</Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* Centered navigation links with icons and added spacing */}
                        <Nav className="mx-auto">
                            <LinkContainer to="/">
                                <Nav.Link className="d-flex align-items-center px-3"><HouseDoor className="me-2" />Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/custom-pc">
                                <Nav.Link className="d-flex align-items-center px-3"><PcDisplay className="me-2" />Custom PC</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/services">
                                <Nav.Link className="d-flex align-items-center px-3"><Tools className="me-2" />Services</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <Nav.Link className="d-flex align-items-center px-3"><InfoCircle className="me-2" />About Us</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/contact">
                                <Nav.Link className="d-flex align-items-center px-3"><Envelope className="me-2" />Contact</Nav.Link>
                            </LinkContainer>
                        </Nav>

                        {/* Auth-related links on the far right */}
                        <Nav className="align-items-center">
                            {user ? (
                                <NavDropdown title={user.email} id="basic-nav-dropdown" align="end">
                                    {isAdmin && (
                                        <LinkContainer to="/admin-dashboard">
                                            <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                                        </LinkContainer>
                                    )}
                                    <LinkContainer to="/my-orders">
                                        <NavDropdown.Item>My Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => setShowLogoutModal(true)}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link as={Button} variant="primary" size="sm" className="ms-2 px-3">
                                            Sign Up
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AppNavbar;

