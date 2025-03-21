export const getUserDetails = async () => {
    try {
      const response = await fetch("https://property-listing-274eb-default-rtdb.firebaseio.com/users.json");
      const data = await response.json();
  
      if (!data) return null;
  
      const users = Object.values(data);
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      
      if (!loggedInUser) return null;
  
      const matchedUser = users.find((user) => user.email.toLowerCase() === loggedInUser.email.toLowerCase());
  
      return matchedUser; // Return the full user object
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };
  