import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip,
  IconButton 
} from '@mui/material';
import { OpenInNew, AccessTime } from '@mui/icons-material';

const NewsCard = ({ article }) => {
  const formatTimeAgo = (publishedAt) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const handleReadMore = () => {
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank');
    }
  };

  return (
    <Card 
      sx={{ 
        background: '#1e222a',
        color: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={article.urlToImage}
        alt={article.title}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Chip 
            label={article.category || 'Sports'} 
            size="small" 
            sx={{ 
              background: '#3b82f6', 
              color: '#fff',
              fontWeight: 600,
              mr: 1
            }} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <AccessTime sx={{ fontSize: 16, color: '#b0b8c1', mr: 0.5 }} />
            <Typography variant="caption" color="#b0b8c1">
              {formatTimeAgo(article.publishedAt)}
            </Typography>
          </Box>
        </Box>
        
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            fontWeight: 600, 
            mb: 1,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {article.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="#b0b8c1" 
          sx={{ 
            mb: 2,
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5
          }}
        >
          {article.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="#3b82f6" fontWeight={600}>
            {article.source?.name || 'Sports News'}
          </Typography>
          
          <IconButton 
            onClick={handleReadMore}
            size="small"
            sx={{ 
              color: '#3b82f6',
              '&:hover': { 
                background: 'rgba(59, 130, 246, 0.1)' 
              }
            }}
          >
            <OpenInNew fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard; 