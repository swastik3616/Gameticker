import React, { useState } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { SportsSoccer, Newspaper } from '@mui/icons-material';
import LiveScores from './LiveScores';
import News from './News';

function App() {
  const [currentSection, setCurrentSection] = useState('scores');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  return (
    <Box sx={{ background: '#181c23', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <AppBar 
        position="static" 
        sx={{ 
          background: '#1e222a',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700,
                color: '#fff'
              }}
            >
              GameTicker
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={currentSection === 'scores' ? 'contained' : 'text'}
                onClick={() => handleSectionChange('scores')}
                startIcon={<SportsSoccer />}
                sx={{
                  color: currentSection === 'scores' ? '#fff' : '#b0b8c1',
                  background: currentSection === 'scores' ? '#3b82f6' : 'transparent',
                  '&:hover': {
                    background: currentSection === 'scores' ? '#2563eb' : 'rgba(255,255,255,0.1)'
                  },
                  minWidth: isMobile ? 'auto' : 120,
                  px: isMobile ? 1 : 2
                }}
              >
                {isMobile ? 'Scores' : 'Live Scores'}
              </Button>
              
              <Button
                variant={currentSection === 'news' ? 'contained' : 'text'}
                onClick={() => handleSectionChange('news')}
                startIcon={<Newspaper />}
                sx={{
                  color: currentSection === 'news' ? '#fff' : '#b0b8c1',
                  background: currentSection === 'news' ? '#3b82f6' : 'transparent',
                  '&:hover': {
                    background: currentSection === 'news' ? '#2563eb' : 'rgba(255,255,255,0.1)'
                  },
                  minWidth: isMobile ? 'auto' : 120,
                  px: isMobile ? 1 : 2
                }}
              >
                {isMobile ? 'News' : 'Latest News'}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ pt: 0 }}>
        {currentSection === 'scores' ? <LiveScores /> : <News />}
      </Box>
    </Box>
  );
}

export default App;
