# Pagination Support

The movie API now supports pagination for all endpoints that return multiple movies. This allows you to efficiently load large datasets in smaller chunks.

## Updated Endpoints

### 1. Get Movies by Category
```
GET /api/movies/category/:type?page=1
```

**Examples:**
- `GET /api/movies/category/popular?page=1` - First page of popular movies
- `GET /api/movies/category/top_rated?page=2` - Second page of top rated movies
- `GET /api/movies/category/now_playing?page=3` - Third page of now playing movies

### 2. Get Movies by Genre
```
GET /api/movies/genre/:id?page=1
```

**Examples:**
- `GET /api/movies/genre/28?page=1` - First page of action movies (genre ID 28)
- `GET /api/movies/genre/35?page=2` - Second page of comedy movies (genre ID 35)

### 3. Search Movies
```
GET /api/movies/search/query?q=search_term&page=1
```

**Examples:**
- `GET /api/movies/search/query?q=batman&page=1` - First page of Batman search results
- `GET /api/movies/search/query?q=marvel&page=2` - Second page of Marvel search results

## Response Format

All paginated endpoints now return a structured response with the following format:

```json
{
  "results": [
    {
      "id": 123,
      "title": "Movie Title",
      "image": "https://image.tmdb.org/t/p/w500/path/to/poster.jpg",
      "backdrop": "https://image.tmdb.org/t/p/original/path/to/backdrop.jpg",
      "logo": "https://image.tmdb.org/t/p/w500/path/to/logo.png",
      "description": "Movie description...",
      "year": 2023,
      "genres": ["Action", "Adventure"],
      "rating": "13+"
    }
    // ... more movies
  ],
  "page": 1,
  "totalPages": 50,
  "totalResults": 1000,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

## Response Fields

- **`results`**: Array of movie objects (same structure as before)
- **`page`**: Current page number
- **`totalPages`**: Total number of pages available
- **`totalResults`**: Total number of movies matching the criteria
- **`hasNextPage`**: Boolean indicating if there's a next page
- **`hasPrevPage`**: Boolean indicating if there's a previous page

## Page Parameter

- **Default**: If no `page` parameter is provided, it defaults to page 1
- **Range**: Valid page numbers are 1 to 1000 (for safety)
- **Validation**: Invalid page numbers are automatically corrected to valid ranges

## Usage Examples

### Frontend Implementation

```javascript
// Example: Load first page of popular movies
const loadPopularMovies = async (page = 1) => {
  const response = await fetch(`/api/movies/category/popular?page=${page}`);
  const data = await response.json();
  
  console.log(`Page ${data.page} of ${data.totalPages}`);
  console.log(`Total results: ${data.totalResults}`);
  console.log(`Has next page: ${data.hasNextPage}`);
  console.log(`Has previous page: ${data.hasPrevPage}`);
  
  return data.results; // Array of movies
};

// Example: Load next page
const loadNextPage = async (currentPage) => {
  const nextPage = currentPage + 1;
  return await loadPopularMovies(nextPage);
};
```

### Pagination Controls

```javascript
// Example: Build pagination controls
const buildPaginationControls = (data) => {
  const controls = {
    currentPage: data.page,
    totalPages: data.totalPages,
    hasNext: data.hasNextPage,
    hasPrev: data.hasPrevPage,
    totalResults: data.totalResults
  };
  
  return controls;
};
```

## Backward Compatibility

The API maintains backward compatibility:
- If no `page` parameter is provided, it defaults to page 1
- The response structure includes all the original movie data
- Existing frontend code will continue to work (just accessing `data.results` instead of the direct array)

## Performance Benefits

- **Reduced Load Times**: Only load 20 movies per request instead of potentially thousands
- **Better UX**: Faster initial page loads and smoother navigation
- **Server Efficiency**: Reduced memory usage and API response times
- **Network Optimization**: Smaller payload sizes for better mobile performance 