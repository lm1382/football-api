import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';  // Import the cors package

dotenv.config();

const app = express();

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://lm1382.brighton.domains',  // Replace with your actual frontend URL
}));

// API route to fetch match data
app.get('/api/leagues', async (req, res) => {
  const API_KEY = process.env.API_KEY;

  try {
    const response = await axios.get('https://v3.football.api-sports.io/leagues', {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': API_KEY,
      },
      params: {
        id: req.query.id || 44,  // Use the query parameter or default to 44
        season: 2022,
      },
    });

    if (response.data.results > 0) {
      res.status(200).json(response.data.response[0]);
    } else {
      res.status(404).json({ error: 'No data found for the specified league and season.' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
