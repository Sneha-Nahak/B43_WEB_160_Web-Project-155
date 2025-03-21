import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resp = await fetch('https://property-listing-274eb-default-rtdb.firebaseio.com/users.json');
                const user = (await resp.json()) || {}; // ✅ Prevents null issues
                setUserData(user);
            } catch (error) {
                setUserError(error.message || "Failed to fetch users"); // ✅ Ensure error is a string
            } finally {
                setUserLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ userData, userLoading, userError }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
