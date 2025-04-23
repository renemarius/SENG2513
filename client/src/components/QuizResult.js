import axios from 'axios';
import React, {useEffect, useRef} from 'react';

const QuizResult = ({topic, score, total, attempts, onTryAgain, difficulty, onShowExplanations, navigate}) => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const userID = localStorage.getItem("userID");
    //const [hasSaved, setHasSaved] = useState(false);

    const hasAttemptedSave = useRef(false);

    useEffect(() => {
        const saveResults = async () => {
          try {
            const payload = {
              userID, topic, score, total, attempts, difficulty,
            };
      
            const res = await axios.post("https://localhost:3001/api/result/save-results", payload);
            if (res.status === 200) {
              // Successfully saved
            }
          } catch (err) {
            console.error("Error saving quiz:", err);
            alert("Failed to save quiz.");
          }
        };
      
        if (isLogin && !hasAttemptedSave.current) {
          hasAttemptedSave.current = true;
          saveResults();
        }
    }, [isLogin, userID, topic, score, total, attempts, difficulty]);
      

    return (
        <div className="card text-white border" style={{backgroundColor: "#1a1a1a",}} >
            <div className="card-body text-center">
                <h2>Quiz Results</h2>
                <h3>Your Score: {score} out of {total}</h3>
                <p>You got {Math.round((score / total) * 100)}%</p>
            
            
                <div className="mt-4">
                    {isLogin && 
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
                    <button className="btn me-2 btn-danger" onClick={() => navigate('/')}>
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizResult;