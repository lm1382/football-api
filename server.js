import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';  // Import the cors package

dotenv.config();

const app = express();

// Enable CORS for the specified frontend domain and localhost (for local development)
app.use(cors({
  origin: ['https://lm1382.brighton.domains', 'http://localhost:3000'],  // Allow both the live domain and local development
}));

// API route to fetch fixtures (upcoming matches)
app.get('/api/fixtures', async (req, res) => {
  const API_KEY = process.env.API_KEY;

  try {
    const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': API_KEY,
      },
      params: {
        league: req.query.league || 44,  // Default to league 44
        season: req.query.season || 2023,  // Default to season 2023
      },
    });

    if (response.data.results > 0) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ error: 'No fixtures found for the specified league and season.' });
    }
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    res.status(500).json({ error: 'Failed to fetch fixtures from the API' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);  // Fix the syntax error here
});
