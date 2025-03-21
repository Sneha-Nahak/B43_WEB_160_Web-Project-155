import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/buyers.css";

const BuyerPropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, buyer } = location.state || {};

  if (!property || !buyer) {
    return <p>No property details available.</p>;
  }

  return (
    <div className="property-details-buyer">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅️ Go Back</button>
      <h2>🏠 {property.title}</h2>
      <p><strong>📍 Location:</strong> {property.location}</p>
      <p>
        {property.rent 
          ? `💰 Rent: ${property.rent}` 
          : property.price 
          ? `💰 Price: ${property.price}` 
          : "💰 Pricing not available"}
      </p>

      <h3>🛒 Buyer Details:</h3>
      <p><strong>🆔 Name:</strong> {buyer.name}</p>
      <p><strong>📞 Contact:</strong> {buyer.contact}</p>
      <p><strong>📧 Email:</strong> {buyer.email}</p>
    </div>
  );
};

export default BuyerPropertyDetails;
