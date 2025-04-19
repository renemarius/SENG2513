// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import QuizSelection from "../components/QuizSelection";
import QuizOption from "../components/QuizOption";

const Home = () => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    return (
        <div
            className="container-fluid row justify-content-center"
            style={{ paddingBottom: '35px', margin: 0}}
            >
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
                    {isLogin && (
                        <>
                            {/*<UserStats />
                            <SavedQuizzes />
                            <button>Save this Quiz</button>*/}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;