const express = require("express");
const router = express.Router();
const {
  getGenres,
  getMoviesByCategory,
  getMoviesByGenre,
  getMovieById,
  searchMovies,
} = require("../services/tmdbService");

/**
 * GET /api/movies/genres
 * Returns all genre names and IDs
 */
router.get("/genres", async (req, res) => {
  try {
    const genres = await getGenres();
    res.json(genres);
  } catch (err) {
    console.error("Error fetching genres:", err);
    res.status(500).send("Failed to fetch genres");
  }
});

/**
 * GET /api/movies/category/:type
 * e.g. /category/popular, /category/top_rated
 */
router.get("/category/:type", async (req, res) => {
  try {
    const movies = await getMoviesByCategory(req.params.type);
    res.json(movies);
  } catch (err) {
    console.error(`Error fetching category ${req.params.type}:`, err);
    res.status(500).send("Failed to fetch category movies");
  }
});

/**
 * GET /api/movies/genre/:id
 * Fetches movies by TMDB genre ID
 */
router.get("/genre/:id", async (req, res) => {
  try {
    const movies = await getMoviesByGenre(req.params.id);
    res.json(movies);
  } catch (err) {
    console.error(`Error fetching genre ${req.params.id}:`, err);
    res.status(500).send("Failed to fetch genre movies");
  }
});

/**
 * GET /api/movies/:id
 * Fetches movie details by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const movie = await getMovieById(req.params.id);
    res.json(movie);
  } catch (err) {
    console.error(`Error fetching movie ${req.params.id}:`, err);
    res.status(500).send("Failed to fetch movie");
  }
});

/**
 * GET /api/movies/search/query?q=...
 * Search movies by query string
 */
router.get("/search/query", async (req, res) => {
  try {
    const results = await searchMovies(req.query.q);
    res.json(results);
  } catch (err) {
    console.error("Search failed:", err);
    res.status(500).send("Search failed");
  }
});

module.exports = router;
