export const fetchProperties = async () => {
    const response = await fetch("https://property-listing-274eb-default-rtdb.firebaseio.com/properties.json");
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return response.json();
  };
  