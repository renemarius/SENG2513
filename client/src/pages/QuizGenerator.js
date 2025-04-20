// pages/GenerateQuiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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

  useEffect(() => {
    if (quizData) {
      navigate('/take-quiz', {
        state: {
          questions: quizData,
          topic,
          difficulty,
        },
      });
    }
  }, [quizData, navigate, topic, difficulty]);
  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError(null);
    
    try {
      let response;

      // AI quiz generator
      if (quizType === 'ai') {
        response = await axios.post('https://localhost:3001/api/ai-quiz/generate', {
          topic,
          numberOfQuestions,
          difficulty
        });

        if (response.data.success) {
          setQuizData(response.data.questions);
        } else {
          setError('Failed to generate quiz questions.');
        }
      
        // Trivia quiz generator
      } else {
        response = await axios.post('https://localhost:3001/api/trivia', {
          topic,
          numberOfQuestions,
          difficulty
        });
      }
      
    
    } catch (err) {
      setError('Error connecting to server. Please try again later.');
      console.error('Error generating quiz:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-quiz-generator">
      <h2>AI-Powered Quiz Generator</h2>
      <form onSubmit={handleGenerateQuiz}>
        <div className="form-group">
          <label htmlFor="topic">What do you want to get tested on?</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Artificial Intelligence"
            required
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="numQuestions">Number of Questions:</label>
          <select 
            id="numQuestions" 
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            className="form-control"
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
            className="form-control"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <button 
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? 'Generating...' : 'Generate Quiz'}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default QuizGenerator;