import Attempts from '../models/attempts.js';
import Result from '../models/result.js';

// Purpose: to easily request stats for the user porfile.
router.get('/api/user/:userID/stats', async (req, res) => {
    const{userID} = req.params; // retrieves user id
    try{
      const attempts = await Attempts.findAll({ where: {userID} }); // find all attempts from user
      const quizzesCompleted = attempts.length; // count
      const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0); // the reduce function helps find the sum of the attempts.
      const averageScore = quizzesCompleted > 0 ? totalScore / quizzesCompleted : 0; // if the quiz completed is > 0, then return the avg. if == 0, then return 0.
  
      const questionsAnswered = await Result.count({ where: {userID} }); // # of questions answered.
  
      res.json({ // response
        quizzesCompleted,
        averageScore: averageScore.toFixed(2),
        questionsAnswered
      });
    }catch(error) {
      console.error('Error getting user stats:', error);
      res.status(500).json({ error: 'Failed to fetch user stats' });
    }
  });