// routes/savedResult.js
import express from "express";
import Result from "../models/savedResult.js";

const router = express.Router();

router.post('/save-results', async (req, res) => {
    try {
      const { userID, topic, score, total, attempts, difficulty } = req.body;
  
      if (!userID || !topic) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const saved = await Result.create({
        userID,
        topic,
        difficulty,
        score,
        totalQuestions: total,
        attempts,
        createdAt: new Date(),
      });
  
      return res.status(200).json({ message: "Results saved", quiz: saved });
    } catch (error) {
      console.error("🔥 Error saving results:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/user/:userID', async (req, res) => {
    try {
      const { userID } = req.params;
      const quizzes = await Result.findAll({
        where: { userID },
        order: [['createdAt', 'DESC']]
      });
      res.json(quizzes);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  });
  

export default router;