import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, ArrowRight } from "lucide-react";

import HomePage from "./components/HomePage";
import ServicesPage from "./components/ServicesPage";
import GalleryPage from "./components/GalleryPage";
import ContactPage from "./components/ContactPage";
import ReviewsPage from "./components/ReviewsPage";
import AboutPage from "./components/AboutPage";

import { ThemeProvider } from "./ThemeContext"; // import your ThemeContext provider

// Landing Page Component
function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        <Car size={60} color="#ffffff" />
        <h1 style={{ margin: 0 }}>AutoCrib Sales & Rentals</h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{
          maxWidth: 600,
          margin: "30px auto",
          fontSize: "1.2rem",
          lineHeight: 1.6,
        }}
      >
        AutoCrib is your one-stop shop for buying and renting top-tier vehicles,
        blending luxury and affordability with unmatched convenience. Whether
        you're cruising for the weekend or shopping for your next car, AutoCrib
        has you covered.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGetStarted}
        style={{
          background: "#00b894",
          color: "white",
          border: "none",
          padding: "15px 30px",
          fontSize: "1rem",
          borderRadius: "30px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 30,
          boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
          transition: "background 0.3s ease",
        }}
      >
        Get Started <ArrowRight />
      </motion.button>
    </div>
  );
}

// App Component with Routing & Global ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
