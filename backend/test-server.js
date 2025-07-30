const express = require("express");
const cors = require("cors");
const movieRoutes = require("./src/routes/movies");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Test server is running at http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("- GET /api/movies/genres");
  console.log("- GET /api/movies/category/:type?page=1");
  console.log("- GET /api/movies/genre/:id?page=1");
  console.log("- GET /api/movies/:id");
  console.log("- GET /api/movies/search/query?q=...&page=1");
});
