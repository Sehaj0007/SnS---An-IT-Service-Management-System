import React from 'react';
// Import useLocation to detect the current route
import { Routes, Route, useLocation } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import HomePage from './pages/HomePage';
import CustomPCPage from './pages/CustomPCPage';
import LoginPage from './pages/LoginPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminRoute from './components/AdminRoute';
import AboutPage from './pages/AboutPage';

// Import the main CSS file for App-wide styles
import './App.css';

function App() {
  // Get the current location object
  const location = useLocation();

  // Define the routes that should have a plain background
  const plainBgRoutes = [
    '/login',
    '/register',
    '/contact',
    '/about',
    '/custom-pc'
  ];

  // Determine which background class to apply
  const backgroundClass = plainBgRoutes.includes(location.pathname) ? 'bg-plain' : 'bg-image';

  return (
    // Apply the conditional background class to the main wrapper div
    <div className={`${backgroundClass} d-flex flex-column min-vh-100`}>
      <AppNavbar />
      <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/custom-pc" element={<CustomPCPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my-orders" element={<OrderHistoryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsPage />} />
            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />
          </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

