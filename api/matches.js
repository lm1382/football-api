import axios from 'axios';

export default async function handler(req, res) {
    const API_KEY = process.env.API_KEY;

    try {
        // Check if the query parameter "id" is provided
        const leagueId = req.query.id || 44;  // Default to 44 if no id is passed

        // Make the API request
        const response = await axios.get('https://v3.football.api-sports.io/leagues', {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': API_KEY,
            },
            params: {
                id: leagueId,
                season: 2022,
            },
        });

        // Send back the API response
        if (response.data.results > 0) {
            res.status(200).json(response.data.response[0]);
        } else {
            res.status(404).json({ error: 'No data found for the specified league and season.' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);  // Log error for debugging
        res.status(500).json({ error: 'Failed to fetch data from the API' });
    }
}
