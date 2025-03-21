import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("https://property-listing-274eb-default-rtdb.firebaseio.com/users.json");
      const data = await response.json();
  
      if (!data) return false;
  
      // Convert Firebase object to array
      const users = Object.values(data);  // Instead of data.users
      const foundUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

  
      if (foundUser) {
        localStorage.setItem("loggedInUser", JSON.stringify({ email: foundUser.email }));
        setUser({ email: foundUser.email });
        return true;
      }
  
      return false; 
    } catch (error) {
      console.error("Error fetching users:", error);
      return false;
    }
  };
  

  const signup = async (name, email, type) => {
    try {
      const newUser = { name, email, type };

      // POST request to Firebase
      await fetch("https://property-listing-274eb-default-rtdb.firebaseio.com/users.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      // Store in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify({ email }));
      setUser({ email });

    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
