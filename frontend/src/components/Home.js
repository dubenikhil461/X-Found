import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCross } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

function Home() {
  return (
    <>
      <div class="slidebar">
        <div class="top">
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            color="grey"
            border="1px solid white"
          />
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            Hello User
          </span>
          <FontAwesomeIcon icon={faCross} size="2x" color="black" />
        </div>
      </div>
      <header className="header">
        <div className="Logo-ham">
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

          <div className="logo">
            <img src="/assets/logo.webp" alt="logo" className="logo-img" />
          </div>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>🔍</button>
        </div>

        <div className="auth-buttons">
          <Link to="/login" className="btn">
            Login
          </Link>
          /
          <Link to="/Signup" className="btn">
            Register
          </Link>
        </div>
      </header>
    </>
  );
}

export default Home;
