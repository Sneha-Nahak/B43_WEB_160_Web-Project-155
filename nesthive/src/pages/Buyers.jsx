import React, { useEffect, useRef, useMemo } from "react";
import { useProperty } from "../context/PropertyContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/buyers.css";

const Buyers = () => {
  const { userData, userLoading, userError } = useUser();
  const { property, propertLoading, propertyError } = useProperty();
  const scrollRefs = useRef([]);
  const navigate = useNavigate();

  // ✅ Move hooks outside of conditionals
  const buyers = useMemo(() => {
    return Object.values(userData || {}).filter((user) => user.type === "buyer");
  }, [userData]);

  useEffect(() => {
    let animationFrames = [];

    const startCircularScroll = (ref) => {
      if (!ref) return;
      const scrollSpeed = 1.2;
      const scroll = () => {
        ref.scrollLeft += scrollSpeed;
        if (ref.scrollLeft >= ref.scrollWidth / 2) {
          ref.scrollLeft = 0;
        }
        animationFrames.push(requestAnimationFrame(scroll));
      };
      scroll();
    };

    scrollRefs.current.forEach((ref) => startCircularScroll(ref));

    return () => animationFrames.forEach((frame) => cancelAnimationFrame(frame));
  }, [buyers]);

  const handlePropertyClick = (buyer, property) => {
    const propertyIdOrBuyerName = property?.id ? property.id : encodeURIComponent(buyer.name);
    navigate(`/buyers/property/${propertyIdOrBuyerName}`, { state: { buyer, property } });
  };

  // ✅ Move conditional returns AFTER all hooks
  if (userLoading || propertLoading) return <p>Loading...</p>;
  if (userError || propertyError) return <p>Error: {userError?.message || propertyError?.message}</p>;

  return (
    <div className="buyer-card">
      <ul className="buyer-list">
        {buyers.map((buyer, index) => (
          <li key={index} className="buyer-section">
            <h3 className="buyer-title">{buyer.name}'s Saved Properties</h3>
            {buyer.saved && buyer.saved.length > 0 ? (
              <div className="scroll-container-buyer" ref={(el) => (scrollRefs.current[index] = el)}>
                <ol className="property-list-buyer">
                  {[...(buyer.saved || []), ...(buyer.saved || [])].map((propertyId, i) => {
                    const savedProperty = property[propertyId];

                    return (
                      <li
                        className="property-card-buyer"
                        key={`${propertyId || buyer.name}-${i}`}
                        onClick={() => handlePropertyClick(buyer, savedProperty)}
                        style={{ cursor: "pointer" }}
                      >
                         <img src={savedProperty?.image || ''} alt={savedProperty?.title || "Unknown Property"} className="buyer-sect-img"/>
                        <h4>{savedProperty?.title || "Unknown Property"}</h4>
                        <p>📍 {savedProperty?.location || "Location not available"}</p>
                        <p>
                          {savedProperty?.rent
                            ? `💰 Rent: ${savedProperty.rent}`
                            : savedProperty?.price
                            ? `💰 Price: ${savedProperty.price}`
                            : "Price not available"}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              <p style={{ fontStyle: "italic", color: "gray",textAlign:'center' }}>There is no saved property here</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Buyers;
