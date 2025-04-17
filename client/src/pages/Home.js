// Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import QuizSelection from "../components/QuizSelection";
import QuizOption from "../components/QuizOption";

const Home = () => {
    return (
        <div className="container-fluid bg-black mt-3 row justify-content-center">
            <div className="col-lg-8 col-md-10 col-sm-12">
                <QuizSelection />
                <div className="space-y-3 w-full">
                    <Link to="/ai-quiz" style={{ textDecoration: 'none' }}>
                        <QuizOption
                            emoji="🤖"
                            title="AI-Powered Quiz"
                            description="Test your knowledge with our AI-generated quizzes."
                        />
                    </Link>
                    <QuizOption
                        emoji="🧠"
                        title="Trivia Database"
                        description="Explore our extensive trivia generated quizzes."
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;