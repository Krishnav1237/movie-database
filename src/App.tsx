import React, { useEffect, useState } from 'react';
import { Container, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MovieList from './components/MovieList';
import { Movie } from './types/movie';
import { fetchMovies } from './services/api';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetchMovies();
        setMovies(response.movies);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Movie Database
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <MovieList movies={movies} loading={loading} error={error} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
