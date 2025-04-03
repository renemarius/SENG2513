import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

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

    return (
        <div className="d-flex justify-content-center align-items-center">
            <AuthForm
                onSubmit={handleLogin}
                isLogin={true} // Sign-up mode 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
            />
        </div>
    );

};

export default Login;
