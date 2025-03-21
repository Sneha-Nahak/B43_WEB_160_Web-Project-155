import React, { useEffect, useRef, useMemo } from "react";
import { useProperty } from "../context/PropertyContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/tenants.css";

const Tenants = () => {
  const { userData, userLoading, userError } = useUser();
  const { property, propertyLoading, propertyError } = useProperty();
  const scrollRefs = useRef([]);
  const navigate = useNavigate();

  // ✅ Memoize tenants list for optimization
  const tenants = useMemo(() => {
    return Object.values(userData || {}).filter((user) => user.type === "tenant");
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

    // Reset and start circular scrolling
    scrollRefs.current.forEach((ref) => startCircularScroll(ref));

    // Cleanup animations on unmount
    return () => animationFrames.forEach((frame) => cancelAnimationFrame(frame));
  }, [tenants]);

  const handlePropertyClick = (tenant, property) => {
    if (!property) {
      console.warn("Property is undefined or null"); // ✅ Prevent navigation errors
      return;
    }
    const propertyIdOrTenantName = property.id ? property.id : encodeURIComponent(tenant.name);
    navigate(`/tenants/property/${propertyIdOrTenantName}`, { state: { tenant, property } });
  };

  // ✅ Move conditional rendering AFTER hooks for React convention
  if (userLoading || propertyLoading) return <p>Loading...</p>;
  if (userError || propertyError)
    return (
      <p>
        Error: {userError?.message || ""} {propertyError?.message || ""}
      </p>
    );

  return (
    <div className="tenant-card">
      <ul className="tenant-list">
        {tenants.map((tenant, index) => {
          // Reset scrollRefs to prevent stale references
          scrollRefs.current = [];
          return (
            <li key={index} className="tenant-section">
              <h3 className="tenant-title">{tenant.name}'s Saved Properties</h3>
              {tenant.saved && tenant.saved.length > 0 ? (
                <div className="scroll-container-tenant" ref={(el) => (scrollRefs.current[index] = el)}>
                  <ol className="property-list-tenant">
                    {[...(tenant.saved || []), ...(tenant.saved || [])].map((propertyId, i) => {
                      const savedProperty = property?.[propertyId]; // ✅ Avoid undefined access
                      return (
                        <li
                          className="property-card-tenant"
                          key={`${propertyId || tenant.name}-${i}`} // Ensure uniqueness
                          onClick={() => handlePropertyClick(tenant, savedProperty)}
                          style={{ cursor: "pointer" }}
                        >
                        <img src={savedProperty?.image || ''} alt={savedProperty?.title || "Unknown Property"} className="tenant-sect-img"/>
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
                <p style={{ fontStyle: "italic", color: "gray" }}>There is no saved property here</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tenants;
