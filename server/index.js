// server/index.js
import express from "express";
import company from "./api/json/company.json" with {type: "json"};
import cors from "cors";
import User from './models/user.js';
import { syncModels } from "./models/index.js";
import dotenv from 'dotenv';
import { generateQuiz } from './api/aiQuiz.js';

// Only use one dotenv config call
dotenv.config();

const app = express();

// Improve CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Increase the limit for JSON parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const PORT = 3002;

syncModels();

app.get("/api/company", (req, res) => {
  return res.json(company);
});

app.get("/api/user", async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

app.post('/api/ai-quiz/generate', generateQuiz);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
