// In TakeQuizPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TakeQuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [quizTopic, setQuizTopic] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [totalAttempts, setTotalAttempts] = useState(0);
  
  useEffect(() => {
    if (location.state?.questions) {
      setQuizData(location.state.questions);
      setQuizTopic(location.state.topic || 'Quiz');
      // Initialize userAnswers array with empty strings
      setUserAnswers(new Array(location.state.questions.length).fill(''));
    } else {
      navigate('/ai-quiz');
    }
  }, [location, navigate]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

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

  const handleShowExplanations = () => {
    setShowExplanations(true);
  };

  const handleContinueTrying = () => {
    // Reset to first question for another attempt
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResults(false);
    // Keep user's previous answers for reference
  };

  if (quizData.length === 0) {
    return <div className="container mt-5 text-center">Loading quiz data...</div>;
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
      ) : !showExplanations ? (
        <div className="card bg-dark text-white border">
          <div className="card-body text-center">
            <h2>Quiz Results</h2>
            <h3>Your Score: {score} out of {quizData.length}</h3>
            <p>You got {Math.round((score / quizData.length) * 100)}%</p>
            
            {totalAttempts >= 2 ? (
              <div className="mt-4">
                <p>You've attempted this quiz {totalAttempts} times. Would you like to see the explanations or try again?</p>
                <button className="btn btn-info me-2" onClick={handleShowExplanations}>
                  Show Explanations
                </button>
                <button className="btn btn-primary me-2" onClick={handleContinueTrying}>
                  Try Again
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/ai-quiz')}>
                  New Quiz
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <button className="btn btn-primary me-2" onClick={handleContinueTrying}>
                  Try Again
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/ai-quiz')}>
                  New Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card bg-dark text-white border">
          <div className="card-body">
            <h2 className="text-center mb-4">Explanations</h2>
            
            {quizData.map((question, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <h4>{index + 1}. {question.question}</h4>
                
                <div className="options mt-2">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className={`mb-1 ${
                      option === question.correctAnswer 
                        ? 'text-success fw-bold' 
                        : option === userAnswers[index]
                          ? 'text-danger' 
                          : ''
                    }`}>
                      {option} {option === question.correctAnswer && '✓'} 
                      {option === userAnswers[index] && option !== question.correctAnswer && '✗'}
                    </div>
                  ))}
                </div>
                
                <div className="explanation mt-3 p-2 bg-dark border-info border rounded">
                  <h5>Explanation:</h5>
                  <p>{question.explanation}</p>
                </div>
              </div>
            ))}
            
            <div className="text-center mt-4">
              <button className="btn btn-primary me-2" onClick={handleRetakeQuiz}>
                Retake Quiz
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/ai-quiz')}>
                New Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TakeQuizPage;