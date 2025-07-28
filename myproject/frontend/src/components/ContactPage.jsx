import React from "react";
import {
  Car,
  Home,
  Settings,
  Image,
  Info,
  Phone,
  Star,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ContactPage() {
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

      {/* CONTACT SECTION */}
      <main style={{ padding: "4rem 2rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem", fontSize: "2rem" }}>
          Get in Touch with <span style={{ color: "#00b894" }}>AutoCrib</span>
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "2rem",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          {/* CONTACT FORM */}
          <form
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              flex: "1 1 300px",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ marginBottom: "1rem" }}>Send us a message</h3>
            <input
              type="text"
              placeholder="Your Name"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "1rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "1rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginBottom: "1rem",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#00b894",
                color: "white",
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>

          {/* COMPANY INFO */}
          <div
            style={{
              flex: "1 1 300px",
              padding: "2rem",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3>Contact Info</h3>
            <p><strong>Email:</strong> support@autocrib.com</p>
            <p><strong>Phone:</strong> +27 12 345 6789</p>
            <p><strong>Address:</strong> 123 Auto Street, Cape Town, South Africa</p>

            {/* SOCIAL MEDIA ICONS */}
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <Icon
                  key={index}
                  size={28}
                  style={{
                    cursor: "pointer",
                    color: "#00b894",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
