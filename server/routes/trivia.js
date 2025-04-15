import express from 'express';
import axios from 'axios';
import Quiz from '../models/quiz.js';
import Question from '../models/question.js';

const router = express.Router();

router.post('/api/trivia', async (req, res) => {
    const {title, category, difficulty} = req.body;
  
    try {
      const response = await axios.get('https://quizmania-api.p.rapidapi.com/trivia', {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'quizmania-api.p.rapidapi.com'
        },
        params: {category, difficulty}
      });
  
      const trivia = response.data;
  
      const quiz = await Quiz.create({title});
  
      for (const item of trivia) {
        const options = [...item.incorrect_answers, item.correct_answer];
        await Question.create({
          quizID: quiz.quizID,
          question: item.question,
          answer: item.correct_answer,
          category: item.category,
          difficulty: item.difficulty,
          options: shuffledOptions
        });
      }
      res.status(201).json({ message: 'Quiz created successfully', quizID: quiz.quizID });

    }catch(err){
      console.error('Error saving quiz:', err);
      res.status(500).json({ error: 'Failed to save trivia quiz' });
    }
    
  });
  
  export default router;