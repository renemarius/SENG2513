// HomeNavbar.jsx
import "../styles/HomeNavbar.css"
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/quizapp_logo.png";
import icon from "../assets/person-icon-1.png";

// HomeNavbar component
const HomeNavbar = () => {
    return (
        <nav className="navbar bg-dark">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="quiz-app-logo" />
                </Link>
            </div>
            <div className="nav-right">
                <ul className="nav-links">
                    <li>
                        <Link to="/login" className="bordered-link">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup" className="bordered-link">Sign Up</Link>
                    </li>
                </ul>
                <div className="icon">
                    <Link to="/">
                        <img src={icon} alt="quiz-app-logo" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default HomeNavbar;