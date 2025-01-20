import axios from 'axios';

export default async function handler(req, res) {
    const API_KEY = process.env.API_KEY; // Load API key from .env file

    try {
        // Make the API request with both league ID and season as query parameters
        const response = await axios.get('https://v3.football.api-sports.io/leagues', {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': API_KEY,
            },
            params: {
                id: 44,        // League ID for FA WSL
                season: 2022,  // Season year
            },
        });

        // Log the response for debugging purposes
        console.log(response.data);

        // Check if the API returned any results
        if (response.data.results > 0) {
            res.status(200).json(response.data.response[0]); // Return the first league result
        } else {
            res.status(404).json({ error: 'No data found for the specified league and season.' });
        }
    } catch (error) {
        // Log the error and send a 500 response
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from the API' });
    }
}
