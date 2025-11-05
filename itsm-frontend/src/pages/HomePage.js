import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ServiceList from '../components/ServiceList';
import AppointmentForm from '../components/AppointmentForm';
import { Button, Container } from 'react-bootstrap';

const HomePage = () => {
  const { user } = useAuth();

  const renderAppointmentSection = () => {
    if (user && user.role === 'ROLE_ADMIN') {
      return null;
    }
    if (user && user.role === 'ROLE_USER') {
      return <AppointmentForm />;
    }
    return (
      <section id="appointment" className="py-5 mt-5">
        <div className="text-center p-4">
          <h2 className="fw-light mb-4">Book a Consultancy Appointment</h2>
          <p className="text-muted mb-4">
            Please log in or create an account to schedule an appointment with our experts.
          </p>
          <Button as={Link} to="/login" variant="primary" size="lg">
            Login or Register to Book
          </Button>
        </div>
      </section>
    );
  };

  return (
    <div className="homepage">
      {/* Hollow Hero Section */}
      <div className="hero-hollow">
        <div>
          <h1 className="display-2 fw-bold">Professional IT Solutions</h1>
          <p className="lead fs-3">
            Your one-stop solution for all IT-related problems.
          </p>
          {/* --- UPDATED BUTTON STYLE --- */}
          <Button as={Link} to="/contact" variant="outline-light" size="lg" className="mt-3 px-4 py-2 fw-bold">
            Get Help Now
          </Button>
        </div>
      </div>

      {/* This new wrapper provides the semi-transparent background for all scrolling content */}
      <div className="content-container">
        <Container>
          <div className="py-4">
            <h2 className="text-center mb-5 fw-light">Our Services</h2>
            <ServiceList />
          </div>
          {renderAppointmentSection()}
        </Container>
      </div>
    </div>
  );
};

export default HomePage;

