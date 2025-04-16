import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault(); // Prevent page refresh

        // Perform local authentication logic
        if (email === "test@example.com" && password === "password123") {
            console.log("Login successful");
            // Redirect or perform further actions upon successful login
        } else {
            console.error("Invalid email or password");
        }
      
        // // We'll send the login data to an API endpoint here
        console.log("Login data:", { email, password });

        // Reset form fields after submission
        setEmail("");
        setPassword("");
    };

    const handleGoogleSuccess = (credentialResponse) => {
        const token = credentialResponse.credential;

        fetch("https://localhost:3000/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: token }),
        })
            .then(res => res.json())
            .then(data => {
                console.log("Server response:", data);
                // Store JWT or user data if needed
            })
            .catch(err => console.error("Auth error", err));

        console.log("Google credential:", credentialResponse);
        console.log("Decoded token:", jwtDecode(token));
    };

    const handleGoogleError = () => {
        console.log("Google login failed");
    };


    return (
        <div className="d-flex justify-content-center align-items-center">
            <AuthForm
                onSubmit={handleLogin}
                isLogin={true} // Sign-up mode 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showGoogleButton={true}
                onGoogleSuccess={handleGoogleSuccess}
                onGoogleError={handleGoogleError}
            />
        </div>
    );

};

export default Login;
