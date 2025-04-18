import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AIQuizGenerator() {
  const [topic, setTopic] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const navigate = useNavigate();

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:3000/api/ai-quiz/generate', {
        topic,
        numberOfQuestions,
        difficulty
      });
      
      if (response.data.success) {
        setQuizData(response.data.questions);
      } else {
        setError('Failed to generate quiz questions.');
      }
    } catch (err) {
      setError('Error connecting to server. Please try again later.');
      console.error('Error generating quiz:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = () => {
    navigate('/take-quiz', { 
      state: { 
        questions: quizData,
        topic: topic,
        difficulty: difficulty
      } 
    });
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
      
      {quizData && (
        <div className="quiz-preview mt-4">
          <h3>Your AI Quiz is Ready!</h3>
          <p>{quizData.length} questions about {topic}</p>
          <button 
            className="btn btn-success"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default AIQuizGenerator;