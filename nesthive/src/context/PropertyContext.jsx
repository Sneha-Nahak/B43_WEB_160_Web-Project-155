import { createContext, useContext, useEffect, useState } from 'react';

export const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
    const [property, setProperty] = useState({});
    const [propertyLoading, setPropertyLoading] = useState(true);
    const [propertyError, setPropertyError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const resp = await fetch('https://property-listing-274eb-default-rtdb.firebaseio.com/properties.json');
                const propertyData = (await resp.json()) || {}; // ✅ Prevents null issues
                setProperty(propertyData);
            } catch (error) {
                setPropertyError(error.message || "Failed to fetch properties"); // ✅ Ensure error is a string
            } finally {
                setPropertyLoading(false);
            }
        };

        fetchProperty();
    }, []);

    return (
        <PropertyContext.Provider value={{ property, propertyLoading, propertyError }}>
            {children}
        </PropertyContext.Provider>
    );
};

export const useProperty = () => useContext(PropertyContext);
