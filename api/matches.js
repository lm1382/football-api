// matches.js

const apiUrl = 'https://v3.football.api-sports.io/fixtures?league=44&season=2023'; // The fixtures API URL

// Function to fetch the fixtures data
async function fetchFixtures() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'db143d64f86cad0d40101d1dac467a1e', // Replace with your actual API key
      }
    });

    const fixturesData = await response.json();

    if (fixturesData.errors) {
      console.error("API Error:", fixturesData.errors);
      return;
    }

    // Log the data to inspect its structure
    console.log(fixturesData);

    // Call function to display the fixtures
    displayFixtures(fixturesData);
  } catch (error) {
    console.error("Error fetching fixtures:", error);
  }
}

// Function to display the fixtures on the website
function displayFixtures(data) {
  const matchScheduleElement = document.getElementById("match-schedule");
  const fixtures = data.response; // The list of fixtures from the API response

  // Check if there are any fixtures available
  if (fixtures && fixtures.length > 0) {
    let fixturesHtml = "<h3>Upcoming Matches:</h3><ul>";
    
    fixtures.forEach(fixture => {
      // Format the fixture date to a readable format
      const matchDate = new Date(fixture.fixture.date).toLocaleString(); // Example: '12/5/2023, 2:00 PM'

      fixturesHtml += `
        <li>
          <strong>${fixture.homeTeam.teamName} vs ${fixture.awayTeam.teamName}</strong>
          <br>
          Date: ${matchDate}
          <br>
          Venue: ${fixture.fixture.venue.name}
        </li>
      `;
    });

    fixturesHtml += "</ul>";
    matchScheduleElement.innerHTML = fixturesHtml;
  } else {
    matchScheduleElement.innerHTML = "<p>No upcoming matches available.</p>";
  }
}

// Call the function to fetch match data when the page loads
fetchFixtures();
