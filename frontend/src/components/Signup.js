import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validateUsername = (username) => /^[a-z]+$/.test(username);
  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[\W]).{1,15}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: name === "username" && !validateUsername(value) ? "Username must be lowercase." : "",
      password: name === "password" && !validatePassword(value) 
        ? "Password must start with an uppercase letter, contain a special character, and be max 15 characters."
        : "",
    }));
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUsername(formData.username) || !validatePassword(formData.password)) return;
    console.log("Signup form submitted", formData);
    setMessage("Signup successful! You can now log in.");
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  };

 

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    width: "350px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  };

  const errorStyle = {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  };

  return (
    <div style={containerStyle}>
      
      <div >
        <Link to="/Home">
          <img src="/assets/logo.webp" alt="logo" style={{ height: "60px" }} />
        </Link>
      </div>

      {/* Signup Card */}
      <div style={cardStyle}>
        <h2>Sign Up</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          {errors.username && <p style={errorStyle}>{errors.username}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          {errors.password && <p style={errorStyle}>{errors.password}</p>}

          <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
