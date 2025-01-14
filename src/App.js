import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  TextField,
  Chip,
  Box,
  IconButton,
  Fade,
  InputAdornment,
  Pagination,
  Grid,
  CircularProgress,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from './components/MovieCard';
import { fetchMovies, fetchGenres, searchMovies } from './services/api';
import './index.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f5f5f5',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000',
        secondary: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            color: isDarkMode ? '#ffffff' : '#000000',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiPagination: {
        styleOverrides: {
          root: {
            '& .MuiPaginationItem-root': {
              color: isDarkMode ? '#ffffff' : '#000000',
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await fetchGenres();
        setGenres(genreList);
      } catch (err) {
        console.error('Failed to load genres:', err);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        if (searchTerm) {
          const data = await searchMovies(searchTerm, page);
          setMovies(data.movies);
          setTotalPages(Math.min(data.totalPages, 500));
        } else {
          const data = await fetchMovies(page);
          setMovies(data.movies);
          setTotalPages(Math.min(data.totalPages, 500));
        }
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
      }
      setLoading(false);
    };

    loadMovies();
  }, [page, searchTerm]);

  const handleSearch = (value) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeoutId = setTimeout(() => {
      setSearchTerm(value);
      setPage(1);
    }, 500);
    
    setSearchTimeout(timeoutId);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getGenreName = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : '';
  };

  const filteredMovies = movies.filter(movie => {
    if (!selectedGenre) return true;
    return movie.genre.includes(parseInt(selectedGenre));
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Movie Database
          </Typography>
          <IconButton onClick={toggleTheme} sx={{ color: 'inherit' }}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ pt: 8 }}>
        <Container maxWidth="xl">
          <Fade in={true} timeout={1000}>
            <Box 
              className="search-bar" 
              sx={{ 
                mt: 3,
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search movies by title..."
                onChange={(e) => handleSearch(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="inherit" />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  label="All Genres"
                  className={`filter-chip ${selectedGenre === '' ? 'active' : ''}`}
                  onClick={() => setSelectedGenre('')}
                />
                {genres.map(genre => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    className={`filter-chip ${selectedGenre === genre.id.toString() ? 'active' : ''}`}
                    onClick={() => setSelectedGenre(genre.id.toString())}
                  />
                ))}
              </Box>
            </Box>
          </Fade>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : (
            <Grid container spacing={3} sx={{ mt: 2, px: 2 }}>
              {movies.map((movie, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <MovieCard movie={movie} index={index} />
                </Grid>
              ))}
            </Grid>
          )}
          {!loading && !error && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 