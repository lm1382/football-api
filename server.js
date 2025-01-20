import express from 'express';
import dotenv from 'dotenv';
import leaguesHandler from './api/matches.js'; // Import your handler from matches.js

dotenv.config();  // Load environment variables from .env

const app = express();  // Create an instance of the Express app

// API route for fetching league data
app.get('/api/leagues', leaguesHandler); // Keep this as /api/leagues to match your desired endpoint

// Set the port to use (defaults to 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
