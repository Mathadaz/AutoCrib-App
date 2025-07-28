import React, { useState } from "react";
import axios from "axios";
import { User, Lock, AlertCircle, CheckCircle } from "lucide-react";

export default function Signup({ onSignupSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post("/api/register/", { username, password });
      setSuccess("Registration successful! You can now log in.");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      if (onSignupSuccess) onSignupSuccess();
    } catch (err) {
      if (err.response && err.response.data) {
        setError("Signup failed: " + JSON.stringify(err.response.data));
      } else {
        setError("Signup failed: Network or server error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 12px 12px 42px",
    borderRadius: 8,
    border: "2px solid #ccc",
    fontSize: 16,
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxSizing: "border-box",
  };

  const iconStyle = {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "#00b894",
  };

  return (
    <form
      onSubmit={handleSignup}
      style={{
        maxWidth: 360,
        margin: "40px auto",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 4px 15px rgba(0, 184, 148, 0.25)",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24, color: "#00b894" }}>
        Sign Up
      </h2>

      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#ffe6e6",
            color: "#d32f2f",
            padding: "12px 16px",
            borderRadius: 6,
            marginBottom: 20,
            fontWeight: "600",
          }}
        >
          <AlertCircle size={20} />
          <span style={{ whiteSpace: "pre-wrap" }}>{error}</span>
        </div>
      )}

      {success && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#e6ffe6",
            color: "#2e7d32",
            padding: "12px 16px",
            borderRadius: 6,
            marginBottom: 20,
            fontWeight: "600",
          }}
        >
          <CheckCircle size={20} />
          <span>{success}</span>
        </div>
      )}

      {/* Username */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <User size={20} style={iconStyle} />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={isLoading}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#00b894";
            e.target.style.boxShadow = "0 0 8px #00b894";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ccc";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Password */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <Lock size={20} style={iconStyle} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#00b894";
            e.target.style.boxShadow = "0 0 8px #00b894";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ccc";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Confirm Password */}
      <div style={{ position: "relative", marginBottom: 28 }}>
        <Lock size={20} style={iconStyle} />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#00b894";
            e.target.style.boxShadow = "0 0 8px #00b894";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ccc";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: "100%",
          padding: 14,
          backgroundColor: "#00b894",
          border: "none",
          borderRadius: 8,
          color: "#fff",
          fontWeight: "700",
          fontSize: 18,
          cursor: isLoading ? "default" : "pointer",
          boxShadow: "0 0 12px rgba(0, 184, 148, 0.6)",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.target.style.backgroundColor = "#009f7a";
            e.target.style.boxShadow = "0 0 16px rgba(0, 159, 122, 0.9)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.target.style.backgroundColor = "#00b894";
            e.target.style.boxShadow = "0 0 12px rgba(0, 184, 148, 0.6)";
          }
        }}
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
