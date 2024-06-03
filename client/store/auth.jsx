import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const storeToken = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem('token', serverToken);
    };

    const isLoggedIn = !!token;

    const logoutUser = () => {
        setToken(null);
        localStorage.removeItem('token');
        setUser(null); // Clear user data on logout
    };

    const userAuthentication = async () => {
        try {
            const response = await fetch('http://localhost:8000/', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                logoutUser(); // Logout if authentication fails
            }
        } catch (err) {
            console.log(err);
            logoutUser(); // Logout on error
        } finally {
            setIsLoading(false); // Set loading to false after authentication check
        }
    };

    useEffect(() => {
        if (token) {
            userAuthentication();
        } else {
            setIsLoading(false); // Set loading to false if no token
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeToken, logoutUser, user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
