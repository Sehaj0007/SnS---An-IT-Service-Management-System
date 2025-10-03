import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    }, [navigate]);

    // This effect runs on initial load or when the token changes in storage
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    // Safely get the role from the token
                    const userRole = decodedToken.roles && Array.isArray(decodedToken.roles) && decodedToken.roles.length > 0 
                        ? decodedToken.roles[0] 
                        : null;
                    
                    setUser({ 
                        email: decodedToken.sub, 
                        name: decodedToken.name,
                        role: userRole
                    });
                }
            } catch (e) {
                console.error("Failed to decode token on initial load:", e);
                logout();
            }
        } else {
            setUser(null);
        }
    }, [token, logout]);

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
            
            // --- NEW ROBUST FIX WITH DEBUGGING ---
            const decoded = jwtDecode(data.token);
            // Print the contents of the token to the browser console for debugging
            console.log("--- Login Debug ---");
            console.log("Decoded Token Claims:", decoded);

            // Safely get the role from the token
            const userRole = decoded.roles && Array.isArray(decoded.roles) && decoded.roles.length > 0 
                ? decoded.roles[0] 
                : null;

            const loggedInUser = {
                email: decoded.sub,
                name: decoded.name,
                role: userRole
            };

            console.log("Setting user state to:", loggedInUser);
            setUser(loggedInUser); // Set the user object directly and immediately

            // Set the token state to ensure the useEffect can work on page reloads
            setToken(data.token); 

            // Navigate based on the role we just determined
            if (loggedInUser.role === 'ADMIN') {
                console.log("Navigating to Admin Dashboard.");
                navigate('/admin-dashboard');
            } else {
                console.log("Navigating to Home Page.");
                navigate('/');
            }

        } catch (err) {
            setError(err.message);
            console.error("Login failed:", err);
        }
    };

    const value = { user, token, error, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

