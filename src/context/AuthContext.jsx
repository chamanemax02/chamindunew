import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('portfolio_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    // Handle Google Login Success
    const handleGoogleLogin = (response) => {
        // In a real app, you would send this token to your backend to verify
        // For now, we'll decode the JWT or just create a user object
        try {
            const base64Url = response.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));

            const userData = {
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                provider: 'google'
            };

            setUser(userData);
            localStorage.setItem('portfolio_user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error("Google Login Error:", error);
            return null;
        }
    };

    // Handle Facebook Login Success
    const handleFacebookLogin = (response) => {
        if (response.accessToken) {
            const userData = {
                name: response.name,
                email: response.email,
                picture: response.picture.data.url,
                provider: 'facebook'
            };
            setUser(userData);
            localStorage.setItem('portfolio_user', JSON.stringify(userData));
            return userData;
        }
    };

    // Mock/Generic login for local use
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('portfolio_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('portfolio_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            handleGoogleLogin,
            handleFacebookLogin,
            logout,
            isAdmin: user?.email === 'ransikachamindu43@gmail.com',
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
