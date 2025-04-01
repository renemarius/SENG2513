import React from "react";
import "../styles/QuizOption.css";

const QuizOption = ({ emoji, title, description }) => {
    return (
        <div className="container-option">
            <div>{emoji}</div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
export default QuizOption;