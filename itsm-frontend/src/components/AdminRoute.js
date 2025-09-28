import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    // Check if user is logged in and has the ROLE_ADMIN role
    if (user && user.roles && user.roles.includes('ROLE_ADMIN')) {
        return children;
    }

    // If not an admin, redirect them to the homepage
    return <Navigate to="/" />;
};

export default AdminRoute;
