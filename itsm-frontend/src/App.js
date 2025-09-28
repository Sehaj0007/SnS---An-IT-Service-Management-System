import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from './components/layout/AppNavbar'; // Corrected path for consistency
import HomePage from './pages/HomePage';
import CustomPCPage from './pages/CustomPCPage';
import LoginPage from './pages/LoginPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'; // Renamed import for clarity
import TermsPage from './pages/TermsPage';             // Renamed import for clarity
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage'; // 1. Import the new Admin Page
import AdminRoute from './components/AdminRoute';       // 2. Import the Admin Route guard

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
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
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsPage />} />

            {/* 3. Add the new, protected route for the Admin Dashboard */}
            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;

