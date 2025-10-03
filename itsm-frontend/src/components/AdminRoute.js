import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    // --- THIS IS THE FIX ---
    // The check is updated to look for the 'role' property (singular)
    // to match the data structure in AuthContext.
    if (user && user.role === 'ROLE_ADMIN') {
        return children; // If user is an admin, show the protected content (the dashboard)
    }

    // If not an admin, redirect them to the homepage.
    return <Navigate to="/" />;
};

export default AdminRoute;
