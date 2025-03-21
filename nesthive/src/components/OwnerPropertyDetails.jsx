import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/owners.css'; // Updated to match owner styles

const OwnerPropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, owner } = location.state || {};
  console.log("Location state:", location.state);

  if (!property || !owner) {
    return <p>No property details available.</p>;
  }

  return (
    <div className="property-details-owner">
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

      <h3>🏡 Owner Details:</h3>
      <p><strong>🆔 Name:</strong> {owner.name}</p>
      <p><strong>📞 Contact:</strong> {owner.contact}</p>
      <p><strong>📧 Email:</strong> {owner.email}</p>
    </div>
  );
};

export default OwnerPropertyDetails;
