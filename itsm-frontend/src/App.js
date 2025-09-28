import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from './components/layout/AppNavbar';
import HomePage from './pages/HomePage';
import CustomPCPage from './pages/CustomPCPage';
import LoginPage from './pages/LoginPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicyPage';
import TermsOfService from './pages/TermsPage';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';


function App() {
  return (
    <div className="d-flex flex-column min-vh-100"> {/* Ensures footer stays at the bottom */}
      <AppNavbar />
      <main className="flex-grow-1">
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/custom-pc" element={<CustomPCPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my-orders" element={<OrderHistoryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;

