import React, { useState, useEffect } from "react";
import axios from "axios";
import { Car, ShoppingCart, Handshake, X, Home, Settings,Image, Info, Phone, Star } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ServicesPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalAction, setModalAction] = useState(""); // 'buy' or 'rent'
  const [showModal, setShowModal] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({ name: "", brand: "", maxPrice: "" });
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/cars/")
      .then(response => {
        setCars(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch cars:", error);
        setLoading(false);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    const { name, brand, maxPrice } = filters;
    const filtered = cars.filter(car => {
      return (
        (!name || car.name.toLowerCase().includes(name.toLowerCase())) &&
        (!brand || car.brand.toLowerCase().includes(brand.toLowerCase())) &&
        (!maxPrice || car.price_per_day <= parseFloat(maxPrice))
      );
    });
    setFilteredCars(filtered);
  }, [filters, cars]);

  const openModal = (car, action) => {
    setSelectedCar(car);
    setModalAction(action);
    setShowModal(true);
  };

  const handleConfirm = () => {
    console.log(`${modalAction.toUpperCase()} confirmed for:`, selectedCar);
    setShowModal(false);
    // Add POST/PUT request logic here to backend for actual processing
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

  if (loading) return <div style={{ textAlign: "center", padding: "2rem" }}>Loading cars...</div>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9f9f9", color: "#333" }}>
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

      {/* SEARCH FILTERS */}
      <div style={{
        maxWidth: "900px",
        margin: "2rem auto",
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={filters.name}
          onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "200px",
            fontSize: "1rem",
          }}
          aria-label="Filter cars by name"
        />
        <input
          type="text"
          placeholder="Search by brand..."
          value={filters.brand}
          onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "200px",
            fontSize: "1rem",
          }}
          aria-label="Filter cars by brand"
        />
        <input
          type="number"
          min="0"
          placeholder="Max price per day (R)"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "200px",
            fontSize: "1rem",
          }}
          aria-label="Filter cars by max price"
        />
      </div>

      {/* CAR GRID */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto 3rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "2rem",
      }}>
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <div
              key={car.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                overflow: "hidden",
                transition: "transform 0.3s ease",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={car.image.startsWith("http") ? car.image : `http://localhost:8000${car.image}`}
                alt={`${car.brand} ${car.name}`}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderBottom: "4px solid #00b894" }}
              />
              <div style={{ padding: "1rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <h3>{car.brand} {car.name} ({car.model_year})</h3>
                <p style={{ flexGrow: 1 }}>{car.description.length > 100 ? car.description.slice(0, 100) + "..." : car.description}</p>
                <p><strong>R {car.price_per_day}/day</strong></p>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                  <button
                    onClick={() => openModal(car, "rent")}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#0d9488",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "background 0.3s",
                    }}
                  >
                    <Handshake size={18} /> Rent
                  </button>
                  <button
                    onClick={() => openModal(car, "buy")}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#dc2626",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "background 0.3s",
                    }}
                  >
                    <ShoppingCart size={18} /> Buy
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
            No cars found matching your criteria.
          </p>
        )}
      </div>

      {/* MODAL */}
      {showModal && selectedCar && (
        <div style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "1rem",
            padding: "2rem",
            width: "90%",
            maxWidth: "500px",
            position: "relative",
            textAlign: "center",
            animation: "fadeInScale 0.3s ease",
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <h2>Confirm {modalAction.toUpperCase()}</h2>
            <p>
              Are you sure you want to <strong>{modalAction}</strong> <br />
              <strong>{selectedCar.brand} {selectedCar.name}</strong> for
              {modalAction === "rent"
                ? ` R${selectedCar.price_per_day}/day`
                : ` R${selectedCar.sale_price || "TBD"}`}?
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-around" }}>
              <button
                onClick={handleConfirm}
                style={{
                  padding: "0.6rem 1.2rem",
                  backgroundColor: "#22c55e",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "0.6rem 1.2rem",
                  backgroundColor: "#f97316",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal animation */}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
