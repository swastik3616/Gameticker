import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  CircularProgress, 
  Alert, 
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import NewsCard from './NewsCard';
import { getSportsNews, getNewsByCategory } from './services/newsApi';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Sports' },
    { value: 'cricket', label: 'Cricket' },
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'olympics', label: 'Olympics' },
    { value: 'formula1', label: 'Formula 1' }
  ];

  const fetchNews = async (category = 'all') => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching news for category:', category);
      
      let newsData;
      if (category === 'all') {
        newsData = await getSportsNews();
      } else {
        newsData = await getNewsByCategory(category);
      }
      
      console.log('News data received:', newsData);
      setNews(newsData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news. Please try again.');
      setNews([]);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Auto-refreshing news...');
      fetchNews(selectedCategory);
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [selectedCategory]);

  const handleRefresh = () => {
    fetchNews(selectedCategory);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    fetchNews(category);
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
          Loading latest sports news...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, background: '#181c23', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="#fff" mr={1}>
          Latest Sports News
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
          Last updated: {lastUpdated.toLocaleTimeString()} (Auto-refreshes every 5 minutes)
        </Typography>
      )}
      
      {/* Category Filter */}
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200, background: '#2d3748', borderRadius: 1 }}>
          <InputLabel sx={{ color: '#fff' }}>Filter by Sport</InputLabel>
          <Select
            value={selectedCategory}
            label="Filter by Sport"
            onChange={handleCategoryChange}
            sx={{ 
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4a5568'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6'
              }
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {/* News Grid */}
      <Grid container spacing={3}>
        {news.map((article, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <NewsCard article={article} />
          </Grid>
        ))}
      </Grid>
      
      {news.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="#fff">
            No news available for the selected category.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default News; 