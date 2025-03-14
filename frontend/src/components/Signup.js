import React, { useState } from "react";
import { Link , useNavigate  } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Signup.css";


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    emailOrPhone: "", // Changed from email to emailOrPhone
    password: "",
  });
  const [message, setMessage] = useState("");
  const validateEmailOrPhone = (value) => {
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone number regex (assumes 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    emailOrPhone: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validateUsername = (username) => /^[a-z]+$/.test(username);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[\W]).{6,15}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "username" && !validateUsername(value)
          ? "Username must be lowercase."
          : name === "emailOrPhone" && !validateEmailOrPhone(value)
          ? "Please enter a valid email or 10-digit phone number"
          : name === "password" && !validatePassword(value)
          ? "Password must start with an uppercase letter, contain a special character, and be 6-15 characters long."
          : "",
    }));
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage("Signup successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      setErrors({
        ...errors,
        general: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="logo-container">
        <Link to="/">
          <img src="/assets/logo.webp" alt="logo" className="logo" />
        </Link>
      </div>

      <div className="signup-card">
        <h2>Sign Up</h2>
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="signup-input"
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
          <div className="input-container">
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or Phone Number"
              value={formData.emailOrPhone}
              onChange={handleChange}
              required
              className="signup-input"
            />
            {errors.emailOrPhone && (
              <p className="error-message">{errors.emailOrPhone}</p>
            )}
          </div>

          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="signup-input"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
