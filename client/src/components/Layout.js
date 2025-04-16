import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeNavbar from "./HomeNavbar";
import QuizNavbar from "./QuizNavbar";
import Footer from "./Footer";

const Layout = () => {
    const location = useLocation();

    // Choose Navbar based on the current route
    let Navbar;
    if (location.pathname === "/" || location.pathname === "/ai-quiz") {
        // Include AI Quiz in the HomeNavbar routes
        Navbar = HomeNavbar;
    } else if (location.pathname === "/login" || location.pathname === "/signup") {
        Navbar = HomeNavbar;  // Use the same navbar for login and signup pages
    } else if (location.pathname.startsWith("/quiz")) {
        Navbar = QuizNavbar;    // Use a different navbar for quiz pages
    } else {
        Navbar = null;      // no navabr for some pages
    }
    
    return (
        <div className="App bg-black d-flex flex-column min-vh-100">
            {Navbar && <Navbar />}
            <main>
                <Outlet />  {/* Render the active page */}
            </main>
            <div className="flex-grow-1"></div> {/* This ensures content grows and pushes footer down */}
            <Footer />
        </div>
    );
};

export default Layout;