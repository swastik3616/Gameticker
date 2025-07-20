import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://allsportsapi2.p.rapidapi.com/api/matches/live',
  headers: {
    'x-rapidapi-key': 'cc321eaf91msh4c9108b19bbbe73p16df44jsne192bf8ecb56',
    'x-rapidapi-host': 'allsportsapi2.p.rapidapi.com'
  }
};

export const getLiveFootballScores = async () => {
  try {
    const response = await axios.request(options);
    console.log('Football API Response:', response.data);
    const matches = response.data || [];
    const transformedData = matches.map(match => ({
      sport: 'Football',
      venue: match.tournament?.name || 'Unknown Venue',
      status: match.status?.type === 'inprogress' ? 'Live' : (match.status?.type === 'finished' ? 'Finished' : 'Upcoming'),
      home: {
        name: match.homeTeam?.name || 'Home',
        score: match.homeScore?.current ?? '-'
      },
      away: {
        name: match.awayTeam?.name || 'Away',
        score: match.awayScore?.current ?? '-'
      },
      date: match.startTimestamp ? new Date(match.startTimestamp * 1000).toLocaleString() : new Date().toLocaleString(),
      league: match.tournament?.name || '',
      country: match.tournament?.category?.name || '',
      isLive: match.status?.type === 'inprogress'
    }));
    console.log('Transformed football data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Football API Error:', error);
    return [];
  }
};

export const getTodayFootballFixtures = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: { date: today },
      headers: {
        'x-rapidapi-key': 'cc321eaf91msh4c9108b19bbbe73p16df44jsne192bf8ecb56',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };
    
    const response = await axios.request(options);
    console.log('Today\'s Football Fixtures:', response.data);
    
    const transformedData = response.data.response?.map(fixture => ({
      sport: 'Football',
      venue: fixture.fixture.venue?.name || 'Unknown Venue',
      status: fixture.fixture.status.short,
      home: {
        name: fixture.teams.home.name,
        score: fixture.goals.home || 0
      },
      away: {
        name: fixture.teams.away.name,
        score: fixture.goals.away || 0
      },
      date: new Date(fixture.fixture.date).toLocaleString(),
      league: fixture.league.name,
      country: fixture.league.country
    })) || [];
    
    return transformedData;
  } catch (error) {
    console.error('Football API Error:', error);
    return [];
  }
}; 