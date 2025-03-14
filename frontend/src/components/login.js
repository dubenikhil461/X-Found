import React, { useState } from "react";
import { Link , useNavigate  } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [errors, setErrors] = useState({ emailOrPhone: "", password: "" });
   const navigate = useNavigate(); 
  const validateEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({
      ...prev,
      [name]: name === "emailOrPhone" && !validateEmailOrPhone(value)
        ? "Please enter a valid email or 10-digit phone number"
        : ""
    }));
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      // Redirect to dashboard or home page
      navigate('/');
    } catch (error) {
      setErrors({
        ...errors,
        general: error.response?.data?.message || 'An error occurred'
      });
    }
  };
  return (
    <div className="login-container">
      <div className="logo-container">
        <Link to="/">
          <img src="/assets/logo.webp" alt="logo" className="logo" />
        </Link>
      </div>

      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or Phone Number"
              value={formData.emailOrPhone}
              onChange={handleChange}
              required
              className="login-input"
            />
            {errors.emailOrPhone && (
              <p className="error-message">{errors.emailOrPhone}</p>
            )}
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/Signup" className="signup-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;