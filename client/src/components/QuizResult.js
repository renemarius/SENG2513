import axios from 'axios';
import React, {useEffect, useRef} from 'react';

const QuizResult = ({topic, score, quizID, total, attempts, onTryAgain, difficulty, onShowExplanations, navigate, quizData, userAnswers}) => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const userID = localStorage.getItem("userID");
    //const [explanationID, setExplanationID] = useState(null);
    //const [hasSaved, setHasSaved] = useState(false);

    const hasAttemptedSave = useRef(false);
    //const hasSavedExplanations = useRef(false);

    // Save explanations
    useEffect(() => {
        const saveEverything = async () => {
          if (!isLogin || !userID || !quizData.length || hasAttemptedSave.current) return;

          hasAttemptedSave.current = true;
          console.log("Topic in Quiz result: ", topic);
         
      
          try {

            // Step 1: Save explanations
            const explanationResponse = await axios.post('https://localhost:3001/api/explanations/save', {
              userID,
              quizID,
              topic,
              explanationData: {
                quizData,
                userAnswers
              }
            });
      
            const explanationID = explanationResponse.data.explanationID;
            console.log("Explanation saved with ID:", explanationID);
            
      
            // Step 2: Save quiz results *after* explanation is saved
            const resultPayload = {
              userID,
              topic,
              score,
              total,
              attempts,
              difficulty,
              quizID,
              explanationID,
            };
      
            const resultRes = await axios.post("https://localhost:3001/api/result/save-results", resultPayload);
            if (resultRes.status === 200) {
              console.log("Saved results successfully");
            }
      
          } catch (err) {
            console.error("Failed to save quiz or explanations:", err);
          }
        };
      
        saveEverything();
    }, [isLogin, userID, quizData, userAnswers, attempts, difficulty, quizID, score, topic, total]);

    return (
        <div className="card bg-dark text-white border" >
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