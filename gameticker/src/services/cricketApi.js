import axios from 'axios';

const baseHeaders = {
  'x-rapidapi-key': 'cc321eaf91msh4c9108b19bbbe73p16df44jsne192bf8ecb56',
  'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
};

export const getLiveCricketScores = async () => {
  try {
    const options = {
      method: 'GET',
      url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live',
      headers: baseHeaders
    };
    
    const response = await axios.request(options);
    console.log('Cricket API Raw Response (Live):', response.data);
    
    if (!response.data.matches || response.data.matches.length === 0) {
      console.log('No live cricket matches found');
      return [];
    }
    
    const transformedData = response.data.matches.map(match => {
      console.log('Processing live match:', match);
      
      const homeTeam = match.teams?.[0]?.name || 'Team 1';
      const awayTeam = match.teams?.[1]?.name || 'Team 2';
      
      let homeScore = 0;
      let awayScore = 0;
      
      if (match.score && Array.isArray(match.score)) {
        homeScore = match.score[0]?.r || match.score[0]?.score || 0;
        awayScore = match.score[1]?.r || match.score[1]?.score || 0;
      } else if (match.score) {
        homeScore = match.score.r || match.score.score || 0;
      }
      
      const venue = match.venueInfo?.ground || 
                   match.venueInfo?.city || 
                   match.venue || 
                   'Unknown Venue';
      
      const status = 'Live';
      
      return {
        sport: 'Cricket',
        venue: venue,
        status: status,
        home: {
          name: homeTeam,
          score: homeScore
        },
        away: {
          name: awayTeam,
          score: awayScore
        },
        date: new Date(match.startDate || Date.now()).toLocaleString(),
        league: match.seriesName || 'Cricket Match',
        country: match.seriesName || 'International',
        isLive: true
      };
    });
    
    console.log('Final live matches data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Cricket API Error (Live):', error);
    return [];
  }
};

export const getUpcomingCricketMatches = async () => {
  try {
    const options = {
      method: 'GET',
      url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming',
      headers: baseHeaders
    };
    
    const response = await axios.request(options);
    console.log('Upcoming Cricket Matches:', response.data);
    
    if (!response.data.matches || response.data.matches.length === 0) {
      console.log('No upcoming cricket matches found');
      return [];
    }
    
    const transformedData = response.data.matches.slice(0, 3).map(match => {
      console.log('Processing upcoming match:', match);
      
      const homeTeam = match.teams?.[0]?.name || 'Team 1';
      const awayTeam = match.teams?.[1]?.name || 'Team 2';
      
      const venue = match.venueInfo?.ground || 
                   match.venueInfo?.city || 
                   match.venue || 
                   'Unknown Venue';
      
      const status = 'Upcoming';
      
      return {
        sport: 'Cricket',
        venue: venue,
        status: status,
        home: {
          name: homeTeam,
          score: '-'
        },
        away: {
          name: awayTeam,
          score: '-'
        },
        date: new Date(match.startDate || Date.now()).toLocaleString(),
        league: match.seriesName || 'Cricket Match',
        country: match.seriesName || 'International',
        isLive: false
      };
    });
    
    console.log('Final upcoming matches data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Cricket API Error (Upcoming):', error);
    return [];
  }
};

export const getRecentCricketMatches = async () => {
  try {
    const options = {
      method: 'GET',
      url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',
      headers: baseHeaders
    };
    
    const response = await axios.request(options);
    console.log('Recent Cricket Matches:', response.data);
    
    if (!response.data.matches || response.data.matches.length === 0) {
      console.log('No recent cricket matches found');
      return [];
    }
    
    const transformedData = response.data.matches.slice(0, 3).map(match => {
      console.log('Processing recent match:', match);
      
      const homeTeam = match.teams?.[0]?.name || 'Team 1';
      const awayTeam = match.teams?.[1]?.name || 'Team 2';
      
      let homeScore = 0;
      let awayScore = 0;
      
      if (match.score && Array.isArray(match.score)) {
        homeScore = match.score[0]?.r || match.score[0]?.score || 0;
        awayScore = match.score[1]?.r || match.score[1]?.score || 0;
      } else if (match.score) {
        homeScore = match.score.r || match.score.score || 0;
      }
      
      const venue = match.venueInfo?.ground || 
                   match.venueInfo?.city || 
                   match.venue || 
                   'Unknown Venue';
      
      const status = 'Finished';
      
      return {
        sport: 'Cricket',
        venue: venue,
        status: status,
        home: {
          name: homeTeam,
          score: homeScore
        },
        away: {
          name: awayTeam,
          score: awayScore
        },
        date: new Date(match.startDate || Date.now()).toLocaleString(),
        league: match.seriesName || 'Cricket Match',
        country: match.seriesName || 'International',
        isLive: false
      };
    });
    
    console.log('Final recent matches data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Cricket API Error (Recent):', error);
    return [];
  }
};

export const getAllCricketData = async () => {
  try {
    console.log('Fetching all cricket data...');
    
    // Get live matches first
    const liveMatches = await getLiveCricketScores();
    
    // If we have live matches, return them
    if (liveMatches.length > 0) {
      console.log('Found live matches, returning them');
      return liveMatches;
    }
    
    // If no live matches, get upcoming matches
    const upcomingMatches = await getUpcomingCricketMatches();
    if (upcomingMatches.length > 0) {
      console.log('Found upcoming matches, returning them');
      return upcomingMatches;
    }
    
    // If no upcoming matches, get recent matches
    const recentMatches = await getRecentCricketMatches();
    if (recentMatches.length > 0) {
      console.log('Found recent matches, returning them');
      return recentMatches;
    }
    
    console.log('No cricket data found from any source');
    return [];
    
  } catch (error) {
    console.error('Error fetching all cricket data:', error);
    return [];
  }
}; 