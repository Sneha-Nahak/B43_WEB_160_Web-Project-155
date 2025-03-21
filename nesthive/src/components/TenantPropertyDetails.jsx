import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/tenants.css';

const TenantPropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, tenant } = location.state || {};
  console.log("Location state:", location.state);

  if (!property || !tenant) {
    return <p>No property details available.</p>;
  }

  return (
    <div className="property-details-tenant">
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

      <h3>👤 Tenant Details:</h3>
      <p><strong>🆔 Name:</strong> {tenant.name}</p>
      <p><strong>📞 Contact:</strong> {tenant.contact}</p>
      <p><strong>📧 Email:</strong> {tenant.email}</p>
    </div>
  );
};

export default TenantPropertyDetails;
