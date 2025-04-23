import express from 'express';
import Quiz from '../models/quiz.js';

const router = express.Router();
// Purpose: IF WE COMPLETE OUR GOAL, then this route here to retrieve quizzes users previously took.
router.post('/create', async (req, res) => {
  
    try{
      const{ title } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const saved = await Quiz.create({
        title,
      });

      return res.status(200).json({ message: "Quiz saved", quizID: saved.quizID });
  } catch (error) {
    console.error("🔥 Error saving quiz:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;