// pages/TakeQuiz.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import QuizResult from '../components/QuizResult';
import QuizExplanations from '../components/QuizExplanations';

const TakeQuiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState([]);
    const [quizTopic, setQuizTopic] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showExplanations, setShowExplanations] = useState(false);
    const [totalAttempts, setTotalAttempts] = useState(0);

    useEffect(() => {
        if (location.state?.questions) {
            setQuizData(location.state.questions);
            setQuizTopic(location.state.topic || 'Quiz');
            // Initialize userAnswers array with empty strings
            setUserAnswers(new Array(location.state.questions.length).fill(''));
        } else {
            navigate('/quiz-generator/ai');
        }
    }, [location, navigate]);

    const handleNextQuestion = () => {
        // Save the user's answer for the current question
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestion] = selectedAnswer;
        setUserAnswers(newUserAnswers);
        
        // Check if the answer is correct and update score
        if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
          setScore(score + 1);
        }
        
        // Move to next question or show results
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer('');
        } else {
          setShowResults(true);
          // Increment total attempts when quiz is completed
          setTotalAttempts(totalAttempts + 1);
        }
    };

    const handleRetakeQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setScore(0);
        setShowResults(true);
        setShowExplanations(false);
        // Clear user answers
        setUserAnswers(new Array(quizData.length).fill(''));
        // Reset to review page when retaking
        setShowResults(false);
    };

    const handleContinueTrying = () => {
        // Reset to first question for another attempt
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setScore(0);
        setShowResults(false);
        // Keep user's previous answers for reference
    };

    if (!quizData.length) return <div className="container mt-5 text-center" >Loading...</div>;

    return (
        <div className="container bg-dark text-white mt-4 p-4 rounded" >
            <h1 className="text-center mb-4">{quizTopic} Quiz</h1>
            {!showResults ? (
                <QuestionCard
                    question={quizData[currentQuestion]}
                    current={currentQuestion}
                    total={quizData.length}
                    selectedAnswer={selectedAnswer}
                    onSelect={setSelectedAnswer}
                    onNext={handleNextQuestion}
                />
            ) : !showExplanations ? (
                <QuizResult
                    score={score}
                    total={quizData.length}
                    attempts={totalAttempts}
                    onTryAgain={handleContinueTrying}
                    onRetake={handleRetakeQuiz}
                    onShowExplanations={() => setShowExplanations(true)}
                    navigate={navigate}
                />
            ) : (
                <QuizExplanations
                    quizData={quizData}
                    userAnswers={userAnswers}
                    onRetake={handleRetakeQuiz}
                    navigate={navigate}
                />
            )}
        </div>
    );
    
}

export default TakeQuiz;