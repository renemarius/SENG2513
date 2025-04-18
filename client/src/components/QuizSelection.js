import React from "react";

const QuizSelection = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20vh',
    };

    const headingStyle = {
        fontSize: '3rem',
        marginBottom: '10px',
        color: '#ffffff',
    };

    const paragraphStyle = {
        fontSize: '1rem',
        marginBottom: '20px',
        color: '#ffffff',
    };
    
    const isLogin = localStorage.getItem("isLogin") === "true";
    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Choose Your Quiz Experience</h1>
            <p style={paragraphStyle}>
            Select from our AI-powered quizzes or explore our trivia database
            </p>
            {!isLogin && (
                <p style={{ ...paragraphStyle, fontSize: "0.85rem", opacity: 0.8 }}>
                    Sign up or Login to save your quizzes, track progress, and more!
                </p>
            )}
        </div>
    );
};

export default QuizSelection;