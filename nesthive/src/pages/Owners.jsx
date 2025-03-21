import React, { useEffect, useRef, useMemo } from "react";
import { useProperty } from "../context/PropertyContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/owners.css";

const Owners = () => {
  const { userData, userLoading, userError } = useUser();
  const { property, propertyLoading, propertyError } = useProperty();
  const scrollRefs = useRef([]);
  const navigate = useNavigate();

  // ✅ Memoized list of owners
  const owners = useMemo(() => {
    return Object.values(userData || {}).filter((user) => user.type === "owner");
  }, [userData]);

  useEffect(() => {
    let animationFrames = [];

    const startSmoothScroll = (ref) => {
      if (!ref) return;
      const scrollSpeed = 0.8;
      const scroll = () => {
        ref.scrollLeft += scrollSpeed;
        if (ref.scrollLeft >= ref.scrollWidth - ref.clientWidth) {
          ref.scrollLeft = 0;
        }
        animationFrames.push(requestAnimationFrame(scroll));
      };
      scroll();
    };

    scrollRefs.current.forEach((ref) => startSmoothScroll(ref));

    return () => animationFrames.forEach((frame) => cancelAnimationFrame(frame));
  }, [owners]);

  const handlePropertyClick = (owner, property) => {
    if (!property) {
      console.warn("Property is undefined or null");
      return;
    }
    const propertyIdOrOwnerName = property.id ? property.id : encodeURIComponent(owner.name);
    navigate(`/owners/property/${propertyIdOrOwnerName}`, { state: { owner, property } });
  };

  if (userLoading || propertyLoading) return <p>Loading...</p>;
  if (userError || propertyError)
    return (
      <p>
        Error: {userError?.message || ""} {propertyError?.message || ""}
      </p>
    );

  return (
    <div className="owner-card">
      <ul className="owner-list">
        {owners.map((owner, index) => {
          scrollRefs.current = [];
          return (
            <li key={index} className="owner-section">
              <h3 className="owner-title">{owner.name}'s Listed Properties</h3>
              {owner.listed && owner.listed.length > 0 ? (
                <div className="scroll-container-owner" ref={(el) => (scrollRefs.current[index] = el)}>
                  <ol className="property-list-owner">
                    {[...(owner.listed || []), ...(owner.listed || [])].map((propertyId, i) => {
                      const listedProperty = property?.[propertyId];
                      return (
                        <li
                          className="property-card-owner"
                          key={`${propertyId || owner.name}-${i}`}
                          onClick={() => handlePropertyClick(owner, listedProperty)}
                        >
                          <img src={listedProperty?.image || ''} alt={listedProperty?.title || "Unknown Property"} className="owner-sect-img"/>
                          <h4>{listedProperty?.title || "Unknown Property"}</h4>
                          <p>📍 {listedProperty?.location || "Location not available"}</p>
                          <p>
                            {listedProperty?.price
                              ? `💰 Price: ${listedProperty.price}`
                              : "Price not available"}
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ) : (
                <p style={{ fontStyle: "italic", color: "gray" }}>There is no listed property here</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Owners;
