const express = require("express");
const router = express.Router();
const {
  getGenres,
  getMoviesByCategory,
  getMoviesByGenre,
  getMovieById,
  searchMovies,
  searchSeries,
  searchAll,
} = require("../services/tmdbService");

const validatePage = (page) => {
  const pageNum = parseInt(page) || 1;
  return Math.max(1, Math.min(pageNum, 1000));
};

router.get("/genres", async (req, res) => {
  try {
    const genres = await getGenres();
    res.json(genres);
  } catch (err) {
    console.error("Error fetching genres:", err);
    res.status(500).send("Failed to fetch genres");
  }
});

router.get("/category/:type", async (req, res) => {
  try {
    const page = validatePage(req.query.page);
    const result = await getMoviesByCategory(req.params.type, page);

    res.json(result);
  } catch (err) {
    console.error(`Error fetching category ${req.params.type}:`, err);
    res.status(500).send("Failed to fetch category movies");
  }
});

router.get("/genre/:id", async (req, res) => {
  try {
    const page = validatePage(req.query.page);
    const result = await getMoviesByGenre(req.params.id, page);
    res.json(result);
  } catch (err) {
    console.error(`Error fetching genre ${req.params.id}:`, err);
    res.status(500).send("Failed to fetch genre movies");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await getMovieById(req.params.id);
    res.json(movie);
  } catch (err) {
    console.error(`Error fetching movie ${req.params.id}:`, err);
    res.status(500).send("Failed to fetch movie");
  }
});

router.get("/search/query", async (req, res) => {
  try {
    const page = validatePage(req.query.page);
    const result = await searchMovies(req.query.q, page);
    res.json(result);
  } catch (err) {
    console.error("Search failed:", err);
    res.status(500).send("Search failed");
  }
});

router.get("/search/series", async (req, res) => {
  try {
    const page = validatePage(req.query.page);
    const result = await searchSeries(req.query.q, page);
    res.json(result);
  } catch (err) {
    console.error("Series search failed:", err);
    res.status(500).send("Series search failed");
  }
});

router.get("/search/all", async (req, res) => {
  try {
    const page = validatePage(req.query.page);
    const result = await searchAll(req.query.q, page);
    res.json(result);
  } catch (err) {
    console.error("Combined search failed:", err);
    res.status(500).send("Combined search failed");
  }
});

module.exports = router;
