import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/PropertyDetails.css"; // Import CSS for styling

const PropertyDetails = () => {
  const { propertyName } = useParams(); // Get property name from URL
  const navigate = useNavigate(); // Navigation hook

  return (
    <div className="property-details-container-org">
      <div className="property-card-details-org">
        <h1 className="property-title-org">🏡 {decodeURIComponent(propertyName)}</h1>
        <p className="property-message-org">More details coming soon...</p>

        {/* Back Button */}
        <button className="back-button-org" onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>
  );
};

export default PropertyDetails;
