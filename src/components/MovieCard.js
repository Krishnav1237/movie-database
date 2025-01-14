import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, Box, Chip, Fade, Grow } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { placeholderImage } from '../assets/placeholder';

const MovieCard = ({ movie, index }) => {
  return (
    <Grow in={true} timeout={(index + 1) * 200}>
      <Card 
        elevation={2}
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          overflow: 'visible',
          borderRadius: 2,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: 8,
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -15,
            right: 16,
            backgroundColor: 'background.paper',
            borderRadius: '50%',
            padding: '8px',
            border: '2px solid',
            borderColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            zIndex: 2,
            boxShadow: 3,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }}
        >
          <StarIcon sx={{ color: '#ffd700' }} />
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {movie.rating.toFixed(1)}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            position: 'relative', 
            paddingTop: '150%', 
            width: '100%',
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#303030' : '#f0f0f0',
            borderRadius: '8px 8px 0 0',
            overflow: 'hidden'
          }}
        >
          <Fade in={true} timeout={1000}>
            <CardMedia
              component="img"
              image={movie.imageUrl || placeholderImage}
              alt={movie.title}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
          </Fade>
        </Box>
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            pt: 2,
            pb: '16px !important',
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              height: '3.6em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              color: 'text.primary',
              mb: 2
            }}
          >
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip 
              label={movie.year || 'N/A'} 
              size="small"
              variant="outlined"
              sx={{ 
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white'
                }
              }}
            />
            <Chip 
              label={movie.genre || 'Unknown'} 
              size="small"
              variant="outlined"
              sx={{ 
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'white'
                }
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Rating 
              value={movie.rating / 2} 
              precision={0.5} 
              readOnly 
              size="small"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#ffd700'
                }
              }}
            />
          </Box>
          <Typography 
            variant="body2" 
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '4.5em',
              color: 'text.secondary',
              lineHeight: 1.5
            }}
          >
            {movie.description || 'No description available.'}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
};

export default MovieCard; 