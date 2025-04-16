import React from "react";
import "../styles/AuthForm.css"; 
import { GoogleLogin } from "@react-oauth/google";

const AuthForm = ({ onSubmit, isLogin, email, setEmail, password, setPassword, setFullName, fullName, showGoogleButton, onGoogleSuccess, onGoogleError }) => {
    return (
        <div className="form-wrapper">
            <div className="form-container">
                <form onSubmit={onSubmit} className="bg-gray-3 p-4 rounded-lg shadow-md">
                    <h1 className="text-white text-center mb-3">{isLogin ? "Login" : "Create Account"}</h1>
                    {!isLogin && (
                        <div class="form-group">
                            <label htmlFor="fullName" >Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email" >Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" >Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className={`btn-signup ${isLogin ? "btn-primary" : "btn-success"} btn-block`}>
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                {showGoogleButton && (
                    <div className="google-login-wrapper my-3 text-center">
                        <GoogleLogin
                            onSuccess={onGoogleSuccess}
                            onError={onGoogleError}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default AuthForm;