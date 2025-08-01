import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../../components/navbar/navbar';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieCardPreview } from '../../components/movie-card-preview/movie-card-preview';
import { Movie, PaginatedResponse } from '../../models/movie.model';
import { environment } from '../../../environments/environment';

interface SearchResponse {
  movies: PaginatedResponse;
  series: PaginatedResponse;
}

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.html',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Navbar,
    MovieCard,
    MovieCardPreview,
  ],
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  searchResults = {
    movies: [] as Movie[],
    series: [] as Movie[],
  };

  loading = false;
  loadingMovies = false;
  loadingSeries = false;
  error = '';

  // Pagination state
  moviesPage = 1;
  seriesPage = 1;
  moviesHasMore = false;
  seriesHasMore = false;
  moviesTotal = 0;
  seriesTotal = 0;

  // Hover preview functionality
  previewMovie = signal<Movie | null>(null);
  previewStyle = signal<Partial<CSSStyleDeclaration> | null>(null);
  previewVisible = signal(false);
  hoverCount = 0;
  previewHideTimeout: any = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Check for query parameter in URL
    this.route.queryParams.subscribe((params) => {
      if (params['q']) {
        this.searchQuery = params['q'];
        this.performSearch();
      }
    });
  }

  async performSearch() {
    if (!this.searchQuery.trim()) return;

    this.loading = true;
    this.error = '';
    this.searchResults = { movies: [], series: [] };
    this.moviesPage = 1;
    this.seriesPage = 1;

    try {
      const baseUrl = environment.api.backend;
      const response = await this.http
        .get<SearchResponse>(
          `${baseUrl}/api/movies/search/all?q=${encodeURIComponent(
            this.searchQuery
          )}&page=1`
        )
        .toPromise();

      if (response) {
        this.searchResults.movies = response.movies.results;
        this.searchResults.series = response.series.results;
        this.moviesHasMore = response.movies.hasNextPage;
        this.seriesHasMore = response.series.hasNextPage;
        this.moviesTotal = response.movies.totalResults;
        this.seriesTotal = response.series.totalResults;
      }
    } catch (err) {
      console.error('Search failed:', err);
      this.error = 'Search failed. Please try again later.';
    } finally {
      this.loading = false;
    }
  }

  async loadMoreMovies() {
    if (this.loadingMovies || !this.moviesHasMore) return;

    this.loadingMovies = true;
    this.moviesPage++;

    try {
      const baseUrl = environment.api.backend;
      const response = await this.http
        .get<PaginatedResponse>(
          `${baseUrl}/api/movies/search/query?q=${encodeURIComponent(
            this.searchQuery
          )}&page=${this.moviesPage}`
        )
        .toPromise();

      if (response) {
        // Filter out duplicates
        const existingIds = new Set(
          this.searchResults.movies.map((movie) => movie.id)
        );
        const newMovies = response.results.filter(
          (movie) => !existingIds.has(movie.id)
        );

        this.searchResults.movies = [
          ...this.searchResults.movies,
          ...newMovies,
        ];
        this.moviesHasMore = response.hasNextPage;
      }
    } catch (err) {
      console.error('Failed to load more movies:', err);
      this.moviesPage--; // Revert page increment on error
    } finally {
      this.loadingMovies = false;
    }
  }

  async loadMoreSeries() {
    if (this.loadingSeries || !this.seriesHasMore) return;

    this.loadingSeries = true;
    this.seriesPage++;

    try {
      const baseUrl = environment.api.backend;
      const response = await this.http
        .get<PaginatedResponse>(
          `${baseUrl}/api/movies/search/series?q=${encodeURIComponent(
            this.searchQuery
          )}&page=${this.seriesPage}`
        )
        .toPromise();

      if (response) {
        // Filter out duplicates
        const existingIds = new Set(
          this.searchResults.series.map((series) => series.id)
        );
        const newSeries = response.results.filter(
          (series) => !existingIds.has(series.id)
        );

        this.searchResults.series = [
          ...this.searchResults.series,
          ...newSeries,
        ];
        this.seriesHasMore = response.hasNextPage;
      }
    } catch (err) {
      console.error('Failed to load more series:', err);
      this.seriesPage--; // Revert page increment on error
    } finally {
      this.loadingSeries = false;
    }
  }

  onHoverEnter() {
    this.hoverCount++;
    if (this.previewHideTimeout) {
      clearTimeout(this.previewHideTimeout);
      this.previewHideTimeout = null;
    }
  }

  onHoverLeave() {
    this.hoverCount--;
    if (this.previewHideTimeout) clearTimeout(this.previewHideTimeout);

    this.previewHideTimeout = setTimeout(() => {
      if (this.hoverCount <= 0) {
        this.hidePreview();
      }
    }, 100);
  }

  showPreview(event: MouseEvent, movie: Movie) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    const scaleFactor = 1.3;
    const previewWidth = rect.width * scaleFactor;
    const previewHeight = rect.height * scaleFactor;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const cardLeft = rect.left + scrollX;
    const cardTop = rect.top + scrollY;

    let top = cardTop + (rect.height - previewHeight) / 2;
    let left = cardLeft - (previewWidth - rect.width) / 2;

    const previewBottom = top + previewHeight;
    const viewportTop = scrollY;
    const viewportBottom = scrollY + window.innerHeight;
    const viewportLeft = scrollX;
    const viewportRight = scrollX + window.innerWidth;

    // Vertical bounds
    if (previewBottom > viewportBottom - 140) {
      top = viewportBottom - previewHeight - 140;
    }
    if (top < viewportTop + 8) {
      top = viewportTop + 8;
    }

    // Horizontal edge buffer (for arrows)
    const edgeBuffer = 100;

    const minLeft = viewportLeft + edgeBuffer;
    const maxLeft = viewportRight - previewWidth - edgeBuffer;

    if (left < minLeft) {
      left = minLeft;
    }
    if (left > maxLeft) {
      left = maxLeft;
    }

    this.previewMovie.set(movie);
    this.previewStyle.set({
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      width: `${previewWidth}px`,
    });

    setTimeout(() => {
      this.previewVisible.set(true);
    }, 5);
  }

  hidePreview() {
    this.previewVisible.set(false);
    this.previewMovie.set(null);
    this.previewStyle.set(null);
  }
}
