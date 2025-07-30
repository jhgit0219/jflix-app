const axios = require("axios");

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
  },
  params: {
    language: "en-US",
  },
});

let genreMap = null;

const loadGenres = async () => {
  if (genreMap) return genreMap;
  const res = await tmdb.get("/genre/movie/list");
  genreMap = {};
  for (const genre of res.data.genres) {
    genreMap[genre.id] = genre.name;
  }
  return genreMap;
};

const normalizeMovie = (movie, genreMap, logo = null) => ({
  id: movie.id,
  title: movie.title,
  image: movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null,
  backdrop: movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null,
  logo,
  description: movie.overview || null,
  year: movie.release_date ? parseInt(movie.release_date.split("-")[0]) : null,
  genres: movie.genre_ids?.map((id) => genreMap[id]) || [],
  rating: "13+",
});

exports.getMoviesByCategory = async (type, page = 1) => {
  const genres = await loadGenres();
  const res = await tmdb.get(`/movie/${type}`, {
    params: { page },
  });

  const movies = await Promise.all(
    res.data.results.map(async (m) => {
      const logo = await fetchMovieLogo(m.id);
      return normalizeMovie(m, genres, logo);
    })
  );

  return {
    results: movies,
    page: res.data.page,
    totalPages: res.data.total_pages,
    totalResults: res.data.total_results,
    hasNextPage: res.data.page < res.data.total_pages,
    hasPrevPage: res.data.page > 1,
  };
};

exports.getMoviesByGenre = async (genreId, page = 1) => {
  const genres = await loadGenres();
  const res = await tmdb.get("/discover/movie", {
    params: {
      with_genres: genreId,
      page,
    },
  });

  const movies = await Promise.all(
    res.data.results.map(async (m) => {
      const logo = await fetchMovieLogo(m.id);
      return normalizeMovie(m, genres, logo);
    })
  );

  return {
    results: movies,
    page: res.data.page,
    totalPages: res.data.total_pages,
    totalResults: res.data.total_results,
    hasNextPage: res.data.page < res.data.total_pages,
    hasPrevPage: res.data.page > 1,
  };
};

exports.getMovieById = async (id) => {
  const [res, logo] = await Promise.all([
    tmdb.get(`/movie/${id}`),
    fetchMovieLogo(id),
  ]);

  const movie = res.data;
  return {
    id: movie.id,
    title: movie.title,
    image: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null,
    logo,
    description: movie.overview || null,
    year: movie.release_date
      ? parseInt(movie.release_date.split("-")[0])
      : null,
    genres: movie.genres.map((g) => g.name),
    rating: "13+",
  };
};

exports.searchMovies = async (query, page = 1) => {
  const genres = await loadGenres();
  const res = await tmdb.get("/search/movie", {
    params: {
      query,
      page,
    },
  });

  const movies = res.data.results.map((m) => normalizeMovie(m, genres));

  return {
    results: movies,
    page: res.data.page,
    totalPages: res.data.total_pages,
    totalResults: res.data.total_results,
    hasNextPage: res.data.page < res.data.total_pages,
    hasPrevPage: res.data.page > 1,
  };
};

exports.getGenres = async () => {
  const res = await tmdb.get("/genre/movie/list");
  return res.data.genres;
};

const fetchMovieLogo = async (id) => {
  try {
    const res = await tmdb.get(`/movie/${id}/images`, {
      params: {
        include_image_language: "en,null",
      },
    });

    const logos = res.data.logos || [];
    const bestLogo = logos.find((l) => l.iso_639_1 === "en") || logos[0];
    return bestLogo
      ? `https://image.tmdb.org/t/p/w500${bestLogo.file_path}`
      : null;
  } catch (err) {
    console.error(`Failed to fetch logo for movie ${id}`, err.message);
    return null;
  }
};
