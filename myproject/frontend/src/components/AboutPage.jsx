import React, { useState } from "react";
import { Car, Home, Settings, Image, Info, Phone, Star, StarOff } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function GalleryPage() {
  const navLinkStyle = {
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1rem",
    padding: "8px 12px",
    borderRadius: "6px",
    color: "#333",
    transition: "all 0.3s ease",
  };

  const activeNavLinkStyle = {
    backgroundColor: "#00b894",
    color: "white",
  };

  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });

  const handleChange = (e) => {
    setFeedbackForm({ ...feedbackForm, [e.target.name]: e.target.value });
  };

  const handleStarClick = (index) => {
    setFeedbackForm({ ...feedbackForm, rating: index + 1 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted. Thank you!");
    setFeedbackForm({ name: "", email: "", rating: 0, message: "" });
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

      {/* ABOUT SECTION */}
      <main style={{ padding: "4rem 2rem", textAlign: "center", animation: "fadeIn 1s ease-in-out" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>About AutoCrib</h2>
        <p style={{ fontSize: "1.1rem", maxWidth: "800px", margin: "0 auto 2rem", color: "#555" }}>
          AutoCrib Sales and Rentals is your trusted partner in car rentals and sales, offering affordable and high-quality
          vehicles tailored to your needs. Whether you're looking to rent for a quick trip or buy your dream car,
          AutoCrib provides convenience, reliability, and excellence.
        </p>

        {/* Feedback Form */}
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "2rem",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#00b894" }}>Leave Your Feedback</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={feedbackForm.name}
              onChange={handleChange}
              required
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={feedbackForm.email}
              onChange={handleChange}
              required
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />

            {/* Star Rating */}
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "10px" }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={24}
                  color={i < feedbackForm.rating ? "#00b894" : "#ccc"}
                  onClick={() => handleStarClick(i)}
                  style={{ cursor: "pointer", transition: "transform 0.2s ease-in-out" }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              ))}
            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              value={feedbackForm.message}
              onChange={handleChange}
              rows={4}
              required
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#00b894",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#019174")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#00b894")}
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
