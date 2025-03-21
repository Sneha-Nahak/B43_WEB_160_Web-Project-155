import { useEffect, useState } from "react";
import { getUserDetails } from "../utils/UserUtils";
import { useNavigate } from "react-router-dom";
import { fetchProperties } from "../services/properttyService";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserDetails();
      setUser(userData);
    };

    fetchUserData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {user ? (
        <h2>Welcome to NestHive, {user.name.split(" ")[0]}!</h2>
      ) : (
        <h2>Loading user data...</h2>
      )}
    </div>
  );
};

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    bedrooms: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
  });

  const [searchQuery, setSearchQuery] = useState(""); // Separate state for debounced search
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProperties();
        setProperties(Object.values(data));
        setFilteredProperties(Object.values(data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchData();
  }, []);

  // Debounce the search query
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setFilters((prev) => ({ ...prev, location: searchQuery }));
    }, 500); // 500ms delay

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  // Handle filtering logic
  useEffect(() => {
    let updatedList = properties;

    if (filters.location) {
      updatedList = updatedList.filter((prop) =>
        prop.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.bedrooms) {
      updatedList = updatedList.filter(
        (prop) => prop.bedrooms === Number(filters.bedrooms)
      );
    }

    if (filters.type) {
      updatedList = updatedList.filter((prop) => prop.type === filters.type);
    }

    if (filters.minPrice) {
      updatedList = updatedList.filter(
        (prop) => (prop.price || prop.rent) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      updatedList = updatedList.filter(
        (prop) => (prop.price || prop.rent) <= Number(filters.maxPrice)
      );
    }

    if (filters.sortBy === "priceLowToHigh") {
      updatedList = updatedList.sort(
        (a, b) => (a.price || a.rent) - (b.price || b.rent)
      );
    } else if (filters.sortBy === "priceHighToLow") {
      updatedList = updatedList.sort(
        (a, b) => (b.price || b.rent) - (a.price || a.rent)
      );
    } else if (filters.sortBy === "bedrooms") {
      updatedList = updatedList.sort((a, b) => a.bedrooms - b.bedrooms);
    } else if (filters.sortBy === "location") {
      updatedList = updatedList.sort((a, b) =>
        a.location.localeCompare(b.location)
      );
    }

    setFilteredProperties(updatedList);
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query with debouncing
  };

  const handlePropertyClick = (property) => {
    navigate(`/property/${encodeURIComponent(property.title)}`, {
      state: { property },
    });
  };

  if (loading) return <p className="loading-text">Loading properties...</p>;

  return (
    <div className="container-home-upper">
      <div className="container-home">
        {/* Filters Section */}
        <div className="filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by location"
              value={searchQuery}
              onChange={handleSearchChange}
              className="input"
            />
            <FaSearch className="search-icon" />
          </div>

          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="input"
          >
            <option value="">Bedrooms</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
          </select>

          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="input"
          >
            <option value="">Type</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>

          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="input"
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="input"
          />

          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="input"
          >
            <option value="">Sort By</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="bedrooms">Bedrooms</option>
            <option value="location">Location</option>
          </select>
        </div>

        {/* Property Grid */}
        <div className="property-grid">
          {filteredProperties.map((property, index) => (
            <div
              key={index}
              className="property-card"
              onClick={() => handlePropertyClick(property)}
            >
              <img
                src={property.image}
                alt={property.title}
                className="property-image"
              />
              <div className="property-details">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-location">📍 {property.location}</p>
                <p className="property-price">
                  💰{" "}
                  {property.price
                    ? `Sale: ₹${property.price.toLocaleString()}`
                    : `Rent: ₹${property.rent.toLocaleString()}`}
                </p>

                {/* Add link to property details page */}
                <Link
                  to={`/property/${encodeURIComponent(property.title)}`}
                  className="property-link"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
