import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const statusColor = {
  Live: 'success',
  Finished: 'error',
  Upcoming: 'warning',
};

const ScoreCard = ({ sport, venue, status, home, away, date }) => (
  <Box
    sx={{
      background: '#1e222a',
      borderRadius: 2,
      p: 3,
      color: '#fff',
      minHeight: 200,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
          {sport}
        </Typography>
        <Chip
          label={status}
          color={statusColor[status] || 'default'}
          size="small"
          sx={{ fontWeight: 700, color: '#fff', ml: 1 }}
        />
      </Box>
      <Typography variant="body2" sx={{ color: '#b0b8c1', mb: 2 }}>
        {venue}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          {home.name}
        </Typography>
        <Typography variant="subtitle1" fontWeight={700}>
          {home.score}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          {away.name}
        </Typography>
        <Typography variant="subtitle1" fontWeight={700}>
          {away.score}
        </Typography>
      </Box>
    </Box>
    <Typography variant="caption" sx={{ color: '#b0b8c1' }}>
      {status === 'Upcoming' ? 'Scheduled for' : 'At'} {date}
    </Typography>
  </Box>
);

export default ScoreCard; 