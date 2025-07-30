/**
 * @typedef {Object} Movie
 * @property {number} id
 * @property {string} title
 * @property {string|null} image
 * @property {string|null} backdrop
 * @property {string|null} logo
 * @property {string} description
 * @property {number|null} year
 * @property {string[]} genres
 * @property {string} rating
 * @property {number=} match
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {Movie[]} results - Array of movies
 * @property {number} page - Current page number
 * @property {number} totalPages - Total number of pages
 * @property {number} totalResults - Total number of results
 * @property {boolean} hasNextPage - Whether there's a next page
 * @property {boolean} hasPrevPage - Whether there's a previous page
 */
