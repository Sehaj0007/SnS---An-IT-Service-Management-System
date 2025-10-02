import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Initialize token from localStorage to keep user logged in
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Define logout with useCallback to prevent unnecessary re-renders
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    }, [navigate]); // navigate is a dependency since it's used in the function

    // This useEffect is the key. It runs when the app loads or when the token changes.
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // Check if the token is expired
                if (decodedToken.exp * 1000 < Date.now()) {
                    logout(); // If expired, log out the user
                } else {
                    // THE FIX: Set the user state with both email AND roles from the token
                    setUser({ email: decodedToken.sub, roles: decodedToken.roles || [] });
                }
            } catch (e) {
                console.error("Invalid token:", e);
                logout(); // If the token is malformed, log out
            }
        } else {
            // If there's no token, ensure the user is logged out
            setUser(null);
        }
    }, [token, logout]); // Now includes logout in dependencies

    const login = async (email, password) => {
        setError('');
        try {
            const response = await fetch('http://localhost:8081/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Invalid email or password');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            setToken(data.token); // This is the trigger that makes the useEffect run
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const value = { user, token, error, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};