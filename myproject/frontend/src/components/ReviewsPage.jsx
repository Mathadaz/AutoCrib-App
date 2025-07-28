import React, { useState, useEffect } from "react";
import { Car, Home, Settings, Image, Info, Phone, Star } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function GalleryPage() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

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
    <div style={{ minHeight: "100vh", backgroundColor: "#f9f9f9", color: "#333" }}>
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "#00b894",
          color: "white",
          flexWrap: "wrap",
        }}
      >
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

      {/* PAGE PLACEHOLDER */}
      <main style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2>{greeting}, welcome to the AutoCrib Gallery</h2>
        <p style={{ fontSize: "1.1rem", color: "#666" }}>Our finest selections will be displayed here soon.</p>
      </main>
    </div>
  );
}
