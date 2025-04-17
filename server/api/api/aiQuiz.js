// server/api/aiQuiz.js
import axios from 'axios';

export const generateQuiz = async (req, res) => {
  try {
    const { topic, numberOfQuestions = 5, difficulty = 'medium' } = req.body;
    
    // Call to Anthropic Claude API
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 4000,
        messages: [
          {
            role: "user",
            content: `Generate ${numberOfQuestions} multiple-choice quiz questions about ${topic} at ${difficulty} difficulty level. 
                     Format as JSON with this structure:
                     [
                       {
                         "question": "Question text here",
                         "options": ["Option A", "Option B", "Option C", "Option D"],
                         "correctAnswer": "Option A",
                         "explanation": "Brief explanation of the answer"
                       }
                     ]
                     Ensure the questions are factually accurate, clear, and appropriate for a quiz application.`
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    // Parse the JSON from the response
    const content = response.data.content[0].text;
    const questions = JSON.parse(content);
    
    res.json({ success: true, questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ success: false, error: 'Failed to generate questions' });
  }
};