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
let tvGenreMap = null;

const loadGenres = async () => {
  if (genreMap) return genreMap;
  const res = await tmdb.get("/genre/movie/list");
  genreMap = {};
  for (const genre of res.data.genres) {
    genreMap[genre.id] = genre.name;
  }
  return genreMap;
};

const loadTVGenres = async () => {
  if (tvGenreMap) return tvGenreMap;
  const res = await tmdb.get("/genre/tv/list");
  tvGenreMap = {};
  for (const genre of res.data.genres) {
    tvGenreMap[genre.id] = genre.name;
  }
  return tvGenreMap;
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
  type: "movie",
});

const normalizeSeries = (series, genreMap, logo = null) => ({
  id: series.id,
  title: series.name,
  image: series.poster_path
    ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
    : null,
  backdrop: series.backdrop_path
    ? `https://image.tmdb.org/t/p/original${series.backdrop_path}`
    : null,
  logo,
  description: series.overview || null,
  year: series.first_air_date
    ? parseInt(series.first_air_date.split("-")[0])
    : null,
  genres: series.genre_ids?.map((id) => genreMap[id]) || [],
  rating: "13+",
  type: "tv",
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

  const moviesWithLogos = await Promise.all(
    res.data.results.map(async (m) => {
      const logo = await fetchMovieLogo(m.id);
      return normalizeMovie(m, genres, logo);
    })
  );

  return {
    results: moviesWithLogos,
    page: res.data.page,
    totalPages: res.data.total_pages,
    totalResults: res.data.total_results,
    hasNextPage: res.data.page < res.data.total_pages,
    hasPrevPage: res.data.page > 1,
  };
};

exports.searchSeries = async (query, page = 1) => {
  const genres = await loadTVGenres();
  const res = await tmdb.get("/search/tv", {
    params: {
      query,
      page,
    },
  });

  const seriesWithLogos = await Promise.all(
    res.data.results.map(async (s) => {
      const logo = await fetchSeriesLogo(s.id);
      return normalizeSeries(s, genres, logo);
    })
  );

  return {
    results: seriesWithLogos,
    page: res.data.page,
    totalPages: res.data.total_pages,
    totalResults: res.data.total_results,
    hasNextPage: res.data.page < res.data.total_pages,
    hasPrevPage: res.data.page > 1,
  };
};

exports.searchAll = async (query, page = 1) => {
  const [movieGenres, tvGenres] = await Promise.all([
    loadGenres(),
    loadTVGenres(),
  ]);

  const [movieRes, tvRes] = await Promise.all([
    tmdb.get("/search/movie", {
      params: {
        query,
        page,
      },
    }),
    tmdb.get("/search/tv", {
      params: {
        query,
        page,
      },
    }),
  ]);

  const moviesWithLogos = await Promise.all(
    movieRes.data.results.map(async (m) => {
      const logo = await fetchMovieLogo(m.id);
      return normalizeMovie(m, movieGenres, logo);
    })
  );

  const seriesWithLogos = await Promise.all(
    tvRes.data.results.map(async (s) => {
      const logo = await fetchSeriesLogo(s.id);
      return normalizeSeries(s, tvGenres, logo);
    })
  );

  return {
    movies: {
      results: moviesWithLogos,
      page: movieRes.data.page,
      totalPages: movieRes.data.total_pages,
      totalResults: movieRes.data.total_results,
      hasNextPage: movieRes.data.page < movieRes.data.total_pages,
      hasPrevPage: movieRes.data.page > 1,
    },
    series: {
      results: seriesWithLogos,
      page: tvRes.data.page,
      totalPages: tvRes.data.total_pages,
      totalResults: tvRes.data.total_results,
      hasNextPage: tvRes.data.page < tvRes.data.total_pages,
      hasPrevPage: tvRes.data.page > 1,
    },
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

const fetchSeriesLogo = async (id) => {
  try {
    const res = await tmdb.get(`/tv/${id}/images`, {
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
    console.error(`Failed to fetch logo for series ${id}`, err.message);
    return null;
  }
};
