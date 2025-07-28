import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  LogIn,
  UserPlus,
  Car,
  Home,
  Settings,
  Image,
  Info,
  Phone,
  Star,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import Signup from "./SignupForm";

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);
  const [filters, setFilters] = useState({ name: "", brand: "", maxPrice: "" });
  const [filteredCars, setFilteredCars] = useState([]);
  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'signup'

  const cars = [
    {
      name: "WRX",
      brand: "Subaru",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/1a/2022_Subaru_WRX_Limited.jpg",
      price: 659000,
    },
    {
      name: "Golf GTI",
      brand: "Volkswagen",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2e/VW_Golf_8_GTI_IMG_4479.jpg",
      price: 789999,
    },
    {
      name: "Fortuner",
      brand: "Toyota",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8a/2021_Toyota_Fortuner_Crusade_2.8L.jpg",
      price: 720500,
    },
    {
      name: "Tucson",
      brand: "Hyundai",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/f/f5/2022_Hyundai_Tucson_Elite.jpg",
      price: 649999,
    },
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("isDarkMode");
    if (storedTheme) setIsDark(JSON.parse(storedTheme));
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    const { name, brand, maxPrice } = filters;
    const filtered = cars.filter((car) => {
      return (
        (!name || car.name.toLowerCase().includes(name.toLowerCase())) &&
        (!brand || car.brand.toLowerCase().includes(brand.toLowerCase())) &&
        (!maxPrice || car.price <= parseFloat(maxPrice))
      );
    });
    setFilteredCars(filtered);
  }, [filters]);

  const containerStyle = {
    backgroundColor: isDark ? "#1e1e2f" : "#f9f9f9",
    color: isDark ? "#f1f1f1" : "#333",
    minHeight: "100vh",
    padding: "20px",
    transition: "all 0.3s ease-in-out",
    fontFamily: "sans-serif",
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    width: "200px",
  };

  const toggleButtonStyle = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    marginLeft: "10px",
    color: isDark ? "#ffd700" : "#222",
    fontSize: "20px",
  };

  const navLinkStyle = {
    textDecoration: "none",
    fontWeight: "600",
    color: isDark ? "#f1f1f1" : "#333",
    padding: "8px 12px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "1rem",
  };

  const activeNavLinkStyle = {
    backgroundColor: "#00b894",
    color: "#fff",
  };

  // Simple modal overlay styles
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: isDark ? "#2c2c3e" : "#fff",
    padding: "30px",
    borderRadius: "12px",
    position: "relative",
    width: "100%",
    maxWidth: "400px",
    boxShadow: isDark
      ? "0 12px 24px rgba(255, 255, 255, 0.2)"
      : "0 12px 24px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div style={containerStyle}>
      {/* NAVBAR */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: isDark ? "1px solid #444" : "1px solid #ddd",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Car size={32} color="#00b894" />
          <h2 style={{ margin: 0, color: "#00b894", fontWeight: "bold" }}>
            AutoCrib
          </h2>
        </div>

        <nav style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
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
              })}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={toggleButtonStyle}
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
          <LogIn
            title="Login"
            onClick={() => setAuthModal("login")}
            style={{ marginLeft: "15px", cursor: "pointer" }}
          />
          <UserPlus
            title="Sign Up"
            onClick={() => setAuthModal("signup")}
            style={{ marginLeft: "15px", cursor: "pointer" }}
          />
        </div>
      </header>

      {/* GREETING */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", margin: "40px 0 20px" }}
      >
        Welcome to <span style={{ color: "#00b894" }}>AutoCrib</span> – Drive the Future Today!
      </motion.h1>

      {/* FILTERS */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <input
          style={inputStyle}
          placeholder="Search by name..."
          onChange={(e) => setFilters((prev) => ({ ...prev, name: e.target.value }))}
        />
        <input
          style={inputStyle}
          placeholder="Search by brand..."
          onChange={(e) => setFilters((prev) => ({ ...prev, brand: e.target.value }))}
        />
        <input
          style={inputStyle}
          type="number"
          placeholder="Max price (R)"
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
        />
      </div>

      {/* CAR CARDS */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 },
          },
        }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          padding: "40px",
        }}
      >
        {filteredCars.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: isDark ? "#ccc" : "#777",
              gridColumn: "1 / -1",
            }}
          >
            No cars found matching your criteria.
          </p>
        ) : (
          filteredCars.map((car, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.03,
                boxShadow: isDark
                  ? "0 12px 24px rgba(255, 255, 255, 0.2)"
                  : "0 12px 24px rgba(0, 0, 0, 0.2)",
              }}
              style={{
                background: isDark ? "#2c2c3e" : "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={car.image}
                alt={`${car.brand} ${car.name}`}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300x180?text=No+Image")
                }
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "15px" }}>
                <h3 style={{ marginBottom: "10px" }}>
                  {car.brand} {car.name}
                </h3>
                <p style={{ fontWeight: "bold", color: "#00b894" }}>
                  R{car.price.toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* AUTH MODALS */}
      {authModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setAuthModal(null)} // close modal on overlay click
        >
          <div
            style={modalContentStyle}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <button
              onClick={() => setAuthModal(null)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isDark ? "#f1f1f1" : "#333",
              }}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {authModal === "login" && (
              <LoginForm onLoginSuccess={() => setAuthModal(null)} />
            )}
            {authModal === "signup" && (
              <Signup onSignupSuccess={() => setAuthModal(null)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
