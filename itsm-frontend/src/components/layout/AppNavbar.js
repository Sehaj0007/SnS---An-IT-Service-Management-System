import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// The path is corrected to go up two directories to find the context folder.
import { useAuth } from '../../context/AuthContext';

const AppNavbar = () => {
    const { user, logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // --- DEBUGGING LOG ---
    // This will print the user object to the browser console whenever it changes.
    // It will help us see exactly what information the Navbar has.
    useEffect(() => {
        console.log("Navbar received user object:", user);
    }, [user]);

    // --- FINAL FIX ---
    // We check for 'ROLE_ADMIN' to match the standard format from Spring Security.
    const isAdmin = user && user.role === 'ROLE_ADMIN';

    const handleLogout = () => {
        logout();
        setShowLogoutModal(false);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>SnS Solutions</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/custom-pc">
                                <Nav.Link>Custom PC</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/contact">
                                <Nav.Link>Contact</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Nav>
                            {user ? (
                                <NavDropdown title={user.email} id="basic-nav-dropdown" align="end">
                                    {/* This link will now correctly appear for admins */}
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
                                <LinkContainer to="/login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
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

