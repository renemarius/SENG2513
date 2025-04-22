import React from 'react';

const QuizResult = ({score, total, attempts, onTryAgain, onRetake, onShowExplanations, navigate}) => {
    const isLogin = localStorage.getItem("isLogin") === "true";

    return (
        <div className="card text-white border" style={{backgroundColor: "#1a1a1a",}} >
          <div className="card-body text-center">
            <h2>Quiz Results</h2>
            <h3>Your Score: {score} out of {total}</h3>
            <p>You got {Math.round((score / total) * 100)}%</p>
            
            
              <div className="mt-4">
                {attempts >= 2 && 
                <>
                    <p>You've attempted this quiz {attempts} times. Would you like to see the explanations or try again?</p>
                    <button className="btn btn-info me-2" onClick={onShowExplanations}>
                    Show Explanations
                    </button>
                </>
                }
                <button className="btn btn-primary me-2" onClick={onTryAgain}>
                  Try Again
                </button>
                <button className="btn btn-secondary me-2" onClick={() => navigate('/quiz-generator/ai')}>
                  New Quiz
                </button>
                {isLogin && 
                    <button className="btn btn-secondary" onClick={() => navigate('/quiz-generator/ai')}>
                    Save Quiz
                    </button>
                }
              </div>
          </div>
        </div>
    );
}

export default QuizResult;