// Signup.js
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
//import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault(); // Prevent page refresh

        try {
            const response = await fetch("https://localhost:3001/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, email, password }),
            });
    
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("isLogin", "true");
                localStorage.setItem("userName", data.userName);
                navigate("/");
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("Signup failed. Try again later.");
        }

        // Reset form fields after submission
        setUserName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <AuthForm
                onSubmit={handleSignup}
                isLogin={false} // Sign-up mode 
                userName={userName}
                setUserName={setUserName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
            />
        </div>
    );

};

export default Signup;
