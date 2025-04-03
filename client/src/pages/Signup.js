import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (event) => {
        event.preventDefault(); // Prevent page refresh

        // We'll send the signup data to an API endpoint here
        console.log("Signup data:", { fullName, email, password });

        // Reset form fields after submission
        setFullName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <AuthForm
                onSubmit={handleSignup}
                isLogin={false} // Sign-up mode 
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
            />
        </div>
    );

};

export default Signup;
