import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/generate', async (req, res) => {
    const {category, numberOfQuestions, difficulty} = req.body;
  
    try {
      const response = await axios.get('https://quizmania-api.p.rapidapi.com/trivia', {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'quizmania-api.p.rapidapi.com'
        },
        params: {category, numberOfQuestions, difficulty}
      });
  
      const trivia = response.data;

    }catch(err){
      console.error('Error saving quiz:', err);
      res.status(500).json({ error: 'Failed to save trivia quiz' });
    }
    
  });
  
  export default router;