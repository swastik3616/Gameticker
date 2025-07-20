import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Grid, CircularProgress, Alert } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ScoreCard from './ScoreCard';
import { getAllCricketData } from './services/cricketApi';
import { getLiveFootballScores } from './services/footballApi';

const mockScores = [
  {
    sport: 'Basketball',
    venue: 'Harmony Stadium, Harmonia',
    status: 'Live',
    home: { name: 'Thunderbolts', score: 2 },
    away: { name: 'Dragonslayers', score: 3 },
    date: 'July 20, 2025, 18:40',
  },
  {
    sport: 'Basketball',
    venue: 'Silvermoon Arena, Lunaris',
    status: 'Live',
    home: { name: 'Phoenix Rising', score: 3 },
    away: { name: 'Avalanche', score: 2 },
    date: 'July 20, 2025, 18:40',
  }
];

const LiveScores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchScores = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch cricket and football data in parallel
      const [cricketScores, footballScores] = await Promise.all([
        getAllCricketData(),
        getLiveFootballScores()
      ]);
      console.log('Cricket scores received:', cricketScores);
      console.log('Football scores received:', footballScores);
      // Combine all scores
      const allScores = [...cricketScores, ...footballScores, ...mockScores];
      setScores(allScores);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching scores:', err);
      setError('Failed to fetch live scores. Using mock data for other sports.');
      setScores(mockScores);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchScores();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchScores();
  };

  if (loading) {
    return (
      <Box sx={{ 
        p: 4, 
        background: '#181c23', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularProgress sx={{ color: '#fff', mb: 2 }} />
        <Typography variant="h6" color="#fff">
          Loading live scores...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, background: '#181c23', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="#fff" mr={1}>
          Live Scores
        </Typography>
        <IconButton onClick={handleRefresh} color="inherit">
          <RefreshIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Box>
      {error && (
        <Alert severity="warning" sx={{ mb: 3, background: '#2d3748', color: '#fff' }}>
          {error}
        </Alert>
      )}
      {lastUpdated && (
        <Typography variant="caption" color="#b0b8c1" sx={{ mb: 2, display: 'block' }}>
          Last updated: {lastUpdated.toLocaleTimeString()} (Auto-refreshes every 30 seconds)
        </Typography>
      )}
      <Grid container spacing={3}>
        {scores.map((score, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <ScoreCard {...score} />
          </Grid>
        ))}
      </Grid>
      {scores.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="#fff">
            No live scores available at the moment.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LiveScores;