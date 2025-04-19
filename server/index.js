// server/index.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import https from 'https';
import fs from 'fs';
import User from './models/user.js';
import { syncModels } from "./models/index.js";
import { OAuth2Client } from "google-auth-library";
import { generateQuiz } from './api/aiQuiz.js';
import express from 'express';
import authRoutes from './routes/auth.js';

// Configure environment variables first
dotenv.config();

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use the port from .env or fallback to 3000 
const PORT = process.env.PORT || 3001;

// Set up Express
const app = express();

// Improve CORS configuration
app.use(cors({
  origin: 'https://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Increase the limit for JSON parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Set up auth routes
app.use('/api/auth', authRoutes);

// Configure Google OAuth
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// RapidAPI configuration
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

// Sync database models
syncModels();

app.get("/api/user", async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

app.post('/api/ai-quiz/generate', generateQuiz);

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

//app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Trivia route
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

// Google OAuth authentication endpoint
app.post("/api/auth/google", async (req, res) => {
  const { credential } = req.body;
  
  if (!credential) {
    return res.status(400).json({ error: "Missing credential" });
  }
  
  try {
    console.log("Verifying token with client ID:", process.env.GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;
    
    console.log("Authentication successful for:", email);
    
    // Create or find the user in the database
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ 
        email, 
        name, 
        username: name, 
        googleId, 
        password: "oauth", 
      });
      console.log("Created new user:", email);
    } else {
      console.log("Found existing user:", email);
    }
    
    // You could create a JWT here and send it back
    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("OAuth error:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  // In development, add a simple route for testing
  app.get('/login', (req, res) => {
    res.send('Login page placeholder - in development this would be handled by React dev server');
  });
  
  app.get('/', (req, res) => {
    res.send('API server is running. Frontend is available at http://localhost:3000');
  });
}

// Start the server
//app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// Load HTTPS certs
const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

// Use HTTPS server
https.createServer({ key, cert }, app).listen(PORT, () => {
  console.log(`Secure server listening on https://localhost:${PORT}`);
});
