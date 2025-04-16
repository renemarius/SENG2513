import express from 'express';
import Attempts from '../models/attempts.js';
import Result from '../models/result.js';
import Question from '../models/question.js';

const router = express.Router();
// Purpose: IF WE COMPLETE OUR GOAL, then this route here to retrieve quizzes users previously took.
router.post('/api/quiz/submit', async (req, res) => {
    const{userID, quizID, answers} = req.body;
    try{
        let score = 0;
        const resultEntries = [];
    
        for(const answer of answers){
          const question = await Question.findByPk(answer.questionID);
          const isCorrect = question.answer === answer.selectedAnswer;
    
          if(isCorrect) 
            score++;
    
          resultEntries.push({
            userID,
            questionID: answer.questionID,
            isCorrect
          });
        }
        const attempt = await Attempts.create({
            userID,
            quizID,
            score
          });
          await Result.bulkCreate(resultEntries);

    res.json({message: 'Submission successful', score});
  }catch(error){ // debugging stuff
    console.error('Error submitting quiz:', error);
    res.status(500).json({error: 'Failed to submit quiz'});
  }
});

export default router;
