import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faClose,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Home.css";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.log("User not logged in or token expired");
      }
    }

    async function fetchItems() {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setItems(response.data); // Store items in state
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    fetchItems();
    fetchUser();
  }, []);

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  return (
    <>
      {/* Sidebar */}
      <div className={`slidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="top">
          <FontAwesomeIcon icon={faUser} size="2x" color="black" />
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            {user ? `Hello, ${user.name}` : "Hello User"}
          </span>
          <FontAwesomeIcon
            className="close"
            icon={faClose}
            size="2x"
            color="black"
            onClick={toggleSidebar}
          />
        </div>

        {user && (
          <div className="sidebar-menu">
            <Link to="/dashboard" className="sidebar-link">
              <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Header */}
      <header className="header">
        <div className="Logo-ham">
          <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>

          <div className="logo">
            <img src="/assets/logo.webp" alt="logo" className="logo-img" />
          </div>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>🔍</button>
        </div>

        <div className="auth-buttons">
          {user ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn">
                Login
              </Link>
              /
              <Link to="/Signup" className="btn">
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Grid Container with Cards */}
      <div className="grid-container">
        {items.length === 0 ? (
          <p>No items available.</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="card">
              <img src={item.imageUrl} alt={item.name} className="card-image" />
              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-description">{item.description}</p>

                {item.status === "exchange" && (
                  <p className="card-price">Price: ₹{item.price}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Home;
