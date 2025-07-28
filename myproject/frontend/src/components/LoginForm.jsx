import React, { useState } from "react";
import axios from "axios";
import { User, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post("/api/token/", { username, password });
            const { access, refresh } = response.data;

            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);

            if (onLoginSuccess) onLoginSuccess();

            setUsername("");
            setPassword("");
        } catch (err) {
            if (err.response && err.response.data) {
                setError("Login failed: " + JSON.stringify(err.response.data));
            } else {
                setError("Login failed: Network or server error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleLogin}
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
                Login
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

            {/* Username */}
            <div style={{ position: "relative", marginBottom: 20 }}>
                <User
                    size={20}
                    color="#00b894"
                    style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                    }}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                    style={{
                        width: "100%",
                        padding: "12px 12px 12px 42px",
                        borderRadius: 8,
                        border: "2px solid #ccc",
                        fontSize: 16,
                        outline: "none",
                        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                        boxSizing: "border-box",
                    }}
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
            <div style={{ position: "relative", marginBottom: 28 }}>
                <Lock
                    size={20}
                    color="#00b894"
                    style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                    }}
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    style={{
                        width: "100%",
                        padding: "12px 42px 12px 42px",
                        borderRadius: 8,
                        border: "2px solid #ccc",
                        fontSize: 16,
                        outline: "none",
                        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                        boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = "#00b894";
                        e.target.style.boxShadow = "0 0 8px #00b894";
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = "#ccc";
                        e.target.style.boxShadow = "none";
                    }}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        color: "#00b894",
                        display: "flex",
                        alignItems: "center",
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
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
                {isLoading ? "Logging in..." : "Log In"}
            </button>
        </form>
    );
}
