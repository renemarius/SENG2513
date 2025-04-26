import React from "react";
import { Link } from "react-router-dom";

const QuizSelection = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
    };

    const headingStyle = {
        fontSize: '3rem',
        marginBottom: '10px',
        color: '#ffffff',
        textAlign: 'center',
    };

    const paragraphStyle = {
        fontSize: '1rem',
        marginBottom: '20px',
        color: '#ffffff',
        textAlign: 'center',
    };
    
    const cardsContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '2rem',
        marginTop: '2rem',
        width: '100%',
        maxWidth: '1200px',
    };
    
    const cardStyle = {
        backgroundColor: '#2a2a2a', // bg-gray-3
        borderRadius: '0.5rem',
        padding: '1.5rem',
        maxWidth: '400px',
        minWidth: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    };
    
    const cardTitleStyle = {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: '#ffffff',
    };
    
    const cardTextStyle = {
        color: 'rgba(255, 255, 255, 0.75)',
        marginBottom: '1.5rem',
    };
    
    const listStyle = {
        listStyle: 'none',
        padding: 0,
        marginBottom: '1.5rem',
        color: '#ffffff',
    };
    
    const listItemStyle = {
        marginBottom: '0.5rem',
        paddingLeft: '1.5rem',
        position: 'relative',
    };
    
    const aiButtonStyle = {
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '0.25rem',
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        width: '100%',
        textDecoration: 'none',
        display: 'block',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
    };
    
    const triviaButtonStyle = {
        ...aiButtonStyle,
        backgroundColor: '#28a745',
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
            
            <div style={cardsContainerStyle}>
                <div style={cardStyle}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}>
                    <h2 style={cardTitleStyle}>AI-Generated Quiz</h2>
                    <p style={cardTextStyle}>
                        Generate unique quiz questions on any topic using Claude 3.5 Sonnet AI.
                        Perfect for custom topics or specialized knowledge areas.
                    </p>
                    <ul style={listStyle}>
                        <li style={listItemStyle}>
                            <span style={{ position: 'absolute', left: 0 }}>✓</span> Any topic you can imagine
                        </li>
                        <li style={listItemStyle}>
                            <span style={{ position: 'absolute', left: 0 }}>✓</span> Custom difficulty levels
                        </li>
                        <li style={listItemStyle}>
                            <span style={{ position: 'absolute', left: 0 }}>✓</span> Unique questions every time
                        </li>
                    </ul>
                    <Link to="/quiz-generator/ai" 
                        style={aiButtonStyle}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        Use AI Generator
                    </Link>
                </div>
                
                <div style={cardStyle}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}>
                    <h2 style={cardTitleStyle}>Trivia Database</h2>
                    <p style={cardTextStyle}>
                        Use our trivia database with thousands of pre-made questions across
                        various categories and difficulty levels.
                    </p>
                    <ul style={listStyle}>
                        <li style={listItemStyle}>
                            <span style={{ position: 'absolute', left: 0 }}>✓</span> Multiple categories
                        </li>
                        <li style={listItemStyle}>
                            <span style={{ position: 'absolute', left: 0 }}>✓</span> Three difficulty levels
                        </li>
                        <li style={listItemStyle}>
                            <span style={{ position: 'absolute', left: 0 }}>✓</span> Multiple choice questions
                        </li>
                    </ul>
                    <Link to="/quiz-generator/trivia" 
                        style={triviaButtonStyle}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        Use Trivia Database
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QuizSelection;