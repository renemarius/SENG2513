// src/pages/TakeQuizPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TakeQuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [quizTopic, setQuizTopic] = useState('');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    console.log("TakeQuizPage mounted, state:", location.state);
    
    // Check if we have quiz data passed through navigation state
    if (location.state?.questions) {
      setQuizData(location.state.questions);
      setQuizTopic(location.state.topic || 'Quiz');
      console.log("Quiz data loaded:", location.state.questions.length, "questions");
    } else {
      console.error("No quiz data found in navigation state");
      setError("No quiz data found. Please generate a quiz first.");
      // Don't navigate away immediately, show an error message instead
    }
  }, [location, navigate]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    // Move to next question or show results
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResults(false);
  };

  // If there's an error, show it
  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">
          {error}
          <div className="mt-3">
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/ai-quiz')}
            >
              Back to Quiz Generator
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If there's no quiz data yet, show loading
  if (quizData.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading quiz data...</p>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container bg-dark text-white mt-4 p-4 rounded">
      <h1 className="text-center mb-4">{quizTopic} Quiz</h1>
      
      {!showResults ? (
        <div className="card bg-dark text-white border">
          <div className="card-body">
            <h5 className="card-title">Question {currentQuestion + 1} of {quizData.length}</h5>
            <h3 className="mb-4">{quizData[currentQuestion].question}</h3>
            
            <div className="options mb-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <div key={index} className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="quizOption"
                    id={`option${index}`}
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerSelect(option)}
                  />
                  <label className="form-check-label" htmlFor={`option${index}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
            
            <button 
              className="btn btn-primary"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      ) : (
        <div className="card bg-dark text-white border">
          <div className="card-body text-center">
            <h2>Quiz Results</h2>
            <h3>Your Score: {score} out of {quizData.length}</h3>
            <p>You got {Math.round((score / quizData.length) * 100)}%</p>
            
            <button className="btn btn-primary me-2" onClick={handleRestartQuiz}>
              Retake Quiz
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/ai-quiz')}>
              Generate New Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TakeQuizPage;