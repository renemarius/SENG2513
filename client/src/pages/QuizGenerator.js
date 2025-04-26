import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const QuizGenerator = () => {
  const { type } = useParams();
  const quizType = type;

  const [topic, setTopic] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_URL;
  console.log("🧠 API BASE:", API_BASE);
  
  // Debug: Log the quiz type when component loads
  useEffect(() => {
    console.log("QuizGenerator loaded with type:", quizType);
  }, [quizType]);

  useEffect(() => {
    const saveQuizAndNavigate = async () => {
      if (quizData && quizData.length > 0) {
        try {
          console.log("About to navigate with quiz data:", quizData);
          
          const response = await axios.post(`${API_BASE}/api/quiz/create`, {
            title: topic,
          });

          const quizID = response.data.quizID;
          console.log("Quiz created ID: ", quizID);

          navigate('/take-quiz', {
            state: {
              questions: quizData,
              topic,
              difficulty,
              // quizID,
            },
          });
        } catch (error) {
          console.error("Failed to save quiz:", error);
          alert("There was an error saving the quiz. Please try again.");
        }
      }
    };

    saveQuizAndNavigate();
  }, [quizData, navigate, topic, difficulty, API_BASE]);

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    console.log(`Generating ${quizType} quiz with:`, { topic, numberOfQuestions, difficulty });

    try {
      let response;

      if (quizType === 'ai') {
        console.log("Making AI quiz request to:", `${API_BASE}/api/ai-quiz/generate`);
        response = await axios.post(`${API_BASE}/api/ai-quiz/generate`, {
          topic,
          numberOfQuestions,
          difficulty
        });

        console.log("AI quiz response:", response.data);
        
        if (response.data.success) {
          setQuizData(response.data.questions);
        } else {
          setError('Failed to generate quiz questions.');
        }
      } else if (quizType === 'trivia') {
        console.log("Making trivia quiz request to:", `${API_BASE}/api/trivia`);
        response = await axios.post(`${API_BASE}/api/trivia`, {
          topic,
          numberOfQuestions,
          difficulty
        });

        console.log("Trivia quiz response:", response.data);
        
        if (response.data && response.data.questions) {
          // Handle HTML entities in the data
          const decodeHTML = (html) => {
            if (!html) return '';
            const txt = document.createElement('textarea');
            txt.innerHTML = html;
            return txt.value;
          };
          
          // Normalize the questions to ensure they match the format expected by TakeQuiz
          const normalizedQuestions = response.data.questions.map(q => ({
            question: decodeHTML(q.question),
            correctAnswer: decodeHTML(q.correctAnswer),
            options: Array.isArray(q.options) 
              ? q.options.map(decodeHTML) 
              : [...(q.incorrectAnswers || []).map(decodeHTML), decodeHTML(q.correctAnswer)].sort(() => Math.random() - 0.5)
          }));
          
          console.log("Normalized trivia questions:", normalizedQuestions);
          setQuizData(normalizedQuestions);
        } else {
          setError('Failed to generate trivia questions.');
        }
      } else {
        setError(`Unknown quiz type: ${quizType}`);
      }
    } catch (err) {
      console.error('Error generating quiz:', err);
      // Show more detailed error information
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        setError(`Server error: ${err.response.status} - ${err.response.data.error || 'Unknown error'}`);
      } else if (err.request) {
        console.error('Error request:', err.request);
        setError('No response received from server. Please check your connection.');
      } else {
        console.error('Error message:', err.message);
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-wrapper flex-column">
      <h2 className="text-white text-center mb-3">Ready to Challenge Yourself?</h2>
      <p className="text-white text-center mb-0">
        Choose a topic, set your difficulty, and we'll generate questions just for you!
      </p>
      <div className="form-container">
        <form onSubmit={handleGenerateQuiz} className="bg-gray-3 p-3 rounded-lg m-4 shadow-md">
          <div className="form-group">
            <label htmlFor="topic">What do you want to get tested on?</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Artificial Intelligence"
              required
              className="form-control bg-black text-white border-bottom-0 border-white"
              style={{
                boxShadow: 'none',
                WebkitBoxShadow: '0 0 0 1000px black inset',
                WebkitTextFillColor: 'white',
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="numQuestions">Number of Questions:</label>
            <select
              id="numQuestions"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
              className="form-control bg-black text-white border-bottom-0"
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Difficulty Level:</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="form-control bg-black text-white border-bottom-0"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary transition"
            style={{ transformOrigin: 'center' }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
            {isLoading ? 'Generating...' : 'Generate Quiz'}
          </button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default QuizGenerator;