import React, { useEffect, useState } from "react";
import { Car, Home, Settings, Image, Info, Phone, Star } from "lucide-react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function GalleryPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const [filters, setFilters] = useState({
    make: "",
    brand: "",
    model_year: "",
    priceRange: "",
  });

  const makes = [...new Set(cars.map((car) => car.make))];
  const brands = [...new Set(cars.map((car) => car.brand))];
  const years = [...new Set(cars.map((car) => car.model_year))];

  useEffect(() => {
    axios.get("http://localhost:8000/api/cars/")
      .then((res) => {
        setCars(res.data);
        setFilteredCars(res.data);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  useEffect(() => {
    let temp = [...cars];

    if (filters.make) temp = temp.filter(car => car.make === filters.make);
    if (filters.brand) temp = temp.filter(car => car.brand === filters.brand);
    if (filters.model_year) temp = temp.filter(car => car.model_year.toString() === filters.model_year);
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      temp = temp.filter(car => car.price_per_day >= min && car.price_per_day <= max);
    }

    setFilteredCars(temp);
  }, [filters, cars]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const navLinkStyle = {
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1rem",
    padding: "8px 12px",
    borderRadius: "6px",
    color: "#333",
  };

  const activeNavLinkStyle = {
    backgroundColor: "#00b894",
    color: "white",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f2f2f2", color: "#333" }}>
      {/* NAVBAR */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#00b894",
        color: "white",
        flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Car size={32} />
          <h1 style={{ margin: 0, fontWeight: "bold", fontSize: "1.5rem" }}>AutoCrib</h1>
        </div>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {[
            { label: "Home", path: "/home", icon: <Home size={18} /> },
            { label: "Services", path: "/services", icon: <Settings size={18} /> },
            { label: "Gallery", path: "/gallery", icon: <Image size={18} /> },
            { label: "About", path: "/about", icon: <Info size={18} /> },
            { label: "Contact", path: "/contact", icon: <Phone size={18} /> },
            { label: "Reviews", path: "/reviews", icon: <Star size={18} /> },
          ].map(({ label, path, icon }) => (
            <NavLink
              key={label}
              to={path}
              style={({ isActive }) => ({
                ...navLinkStyle,
                ...(isActive ? activeNavLinkStyle : {}),
                display: "flex",
                alignItems: "center",
                gap: "6px",
              })}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* FILTER SECTION */}
      <section style={{ padding: "2rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Browse Our Gallery</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          <select name="make" value={filters.make} onChange={handleChange} style={selectStyle}>
            <option value="">Filter by Make</option>
            {makes.map((make) => <option key={make} value={make}>{make}</option>)}
          </select>

          <select name="brand" value={filters.brand} onChange={handleChange} style={selectStyle}>
            <option value="">Filter by Brand</option>
            {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
          </select>

          <select name="model_year" value={filters.model_year} onChange={handleChange} style={selectStyle}>
            <option value="">Filter by Year</option>
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>

          <select name="priceRange" value={filters.priceRange} onChange={handleChange} style={selectStyle}>
            <option value="">Filter by Price/Day</option>
            <option value="0-500">R0 - R500</option>
            <option value="501-1000">R501 - R1000</option>
            <option value="1001-2000">R1001 - R2000</option>
            <option value="2001-10000">R2001+</option>
          </select>
        </div>

        {/* DISPLAY CARS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.5rem"
        }}>
          {filteredCars.map((car) => (
            <div key={car.id} style={{
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              padding: "1rem"
            }}>
              <h3 style={{ marginBottom: "0.5rem" }}>{car.name}</h3>
              <p style={{ margin: 0 }}><strong>Make:</strong> {car.make}</p>
              <p style={{ margin: 0 }}><strong>Brand:</strong> {car.brand}</p>
              <p style={{ margin: 0 }}><strong>Year:</strong> {car.model_year}</p>
              <p style={{ margin: 0 }}><strong>Price/Day:</strong> R{car.price_per_day}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const selectStyle = {
  padding: "0.6rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};
