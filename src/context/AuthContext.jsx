import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// [IMPORTANT] Replace this with your Google Apps Script URL after deployment
const API_URL = 'https://script.google.com/macros/s/AKfycbxJl9GnLuVO1Ny-JsIQusfz7cds9PvXq0tq43Ydqg2Z8NfZ9I7bWhOATziDvhbsRRc4/exec';

// Helper to decode Google JWT token without external library
const decodeGoogleToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("JWT Decode Error:", e);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user from localStorage on init
        try {
            const savedUser = localStorage.getItem('portfolio_session');
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                if (parsedUser && typeof parsedUser === 'object') {
                    setUser(parsedUser);
                }
            }
        } catch (error) {
            console.error("Failed to parse session:", error);
            localStorage.removeItem('portfolio_session'); // Clear corrupt data
        } finally {
            setLoading(false);
        }
    }, []);

    const setSession = (userData) => {
        console.log("Setting Session for:", userData.email);
        setUser(userData);
        localStorage.setItem('portfolio_session', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('portfolio_session');
    };

    const handleGoogleLogin = async (response) => {
        const payload = decodeGoogleToken(response.credential);
        if (payload) {
            console.log("Google Payload:", payload);
            const userData = {
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                provider: 'google'
            };
            setSession(userData);
        }
    };

    const isAdmin = user?.email?.toLowerCase() === 'ransikachamindu43@gmail.com';
    console.log("Checking Admin Status:", user?.email, "Result:", isAdmin);

    return (
        <AuthContext.Provider value={{
            user,
            logout,
            setSession,
            handleGoogleLogin,
            isAdmin,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
