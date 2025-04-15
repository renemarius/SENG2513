import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import https from "https";
import cors from "cors";
import User from './models/user.js';
import { syncModels } from "./models/index.js";

const app = express();
const CORS = cors();
app.use(CORS);
const PORT = 3001;

//RapidAPI
const rapidApiOptions = {
  method: 'GET',
  hostname: 'quizmania-api.p.rapidapi.com',
  port: null,
  path: '/trivia',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'quizmania-api.p.rapidapi.com'
  }
};

syncModels();

app.get("/api/user", async (req, res) => {
  try {
    // Find all users
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get("/api/trivia", (req, res) => {
  const category = req.query.category || '';
  const difficulty = req.query.difficulty || '';
  const amount = req.query.amount || '10';
  
  const customPath = `/trivia?category=${category}&difficulty=${difficulty}&amount=${amount}`;
  
  const options = {...rapidApiOptions, path: customPath};
  
  const request = https.request(options, (response) => {
    const chunks = [];

    response.on('data', (chunk) => {
      chunks.push(chunk);
    });

    response.on('end', () => {
      try {
        const body = Buffer.concat(chunks);
        const triviaData = JSON.parse(body.toString());
        res.json(triviaData);
      } catch (error) {
        console.error('Error parsing custom trivia API response:', error);
        res.status(500).json({ error: 'Failed to fetch custom trivia questions' });
      }
    });
  });

  request.on('error', (error) => {
    console.error('Error fetching from custom trivia API:', error);
    res.status(500).json({ error: 'Failed to connect to custom trivia API' });
  });

  request.end();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
