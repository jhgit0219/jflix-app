import { Component, OnInit, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../../components/navbar/navbar';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieCardPreview } from '../../components/movie-card-preview/movie-card-preview';
import { Movie, PaginatedResponse } from '../../models/movie.model';
import { environment } from '../../../environments/environment';

interface Genre {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-series',
  templateUrl: './series.html',
  imports: [CommonModule, RouterModule, Navbar, MovieCard, MovieCardPreview],
})
export class SeriesComponent implements OnInit {
  movies: Movie[] = [];
  genres: Genre[] = [];
  selectedGenre: number | null = null;
  loading = false;
  error = '';
  page = 1;
  hasMore = true;

  // Hover preview functionality
  previewMovie = signal<Movie | null>(null);
  previewStyle = signal<Partial<CSSStyleDeclaration> | null>(null);
  previewVisible = signal(false);
  hoverCount = 0;
  previewHideTimeout: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGenres();
    this.loadMovies();
  }

  async loadGenres() {
    try {
      const baseUrl = environment.api.backend;
      this.genres =
        (await this.http
          .get<Genre[]>(`${baseUrl}/api/movies/genres`)
          .toPromise()) || [];
    } catch (err) {
      console.error('Failed to load genres:', err);
      // Fallback to default genres
      this.genres = [
        { id: 28, name: 'Action' },
        { id: 35, name: 'Comedy' },
        { id: 18, name: 'Drama' },
        { id: 27, name: 'Horror' },
        { id: 878, name: 'Science Fiction' },
        { id: 53, name: 'Thriller' },
      ];
    }
  }

  async loadMovies(reset = false) {
    if (this.loading) {
      console.log('Already loading series, skipping request');
      return;
    }

    if (!reset && !this.hasMore) {
      console.log('No more series to load');
      return;
    }

    this.loading = true;
    this.error = '';

    if (reset) {
      this.movies = [];
      this.page = 1;
      this.hasMore = true;
    }

    try {
      const baseUrl = environment.api.backend;
      let endpoint: string;

      if (this.selectedGenre) {
        endpoint = `${baseUrl}/api/movies/genre/${this.selectedGenre}?page=${this.page}&type=tv`;
      } else {
        endpoint = `${baseUrl}/api/movies/category/popular?page=${this.page}&type=tv`;
      }

      console.log(`Loading series from: ${endpoint} (page ${this.page})`);

      const headers = { 'Cache-Control': 'no-cache', Pragma: 'no-cache' };
      const response = (await this.http
        .get<PaginatedResponse>(endpoint, { headers })
        .toPromise()) || {
        results: [],
        page: 1,
        totalPages: 1,
        totalResults: 0,
        hasNextPage: false,
        hasPrevPage: false,
      };

      const newMovies = response.results;
      console.log(
        `Received ${newMovies.length} series for page ${response.page}`
      );

      if (newMovies.length > 0) {
        const movieIds = newMovies.slice(0, 3).map((m) => m.id);
        console.log(`First 3 series IDs on page ${response.page}:`, movieIds);
      }

      if (reset) {
        this.movies = newMovies;
      } else {
        const existingIds = new Set(this.movies.map((movie) => movie.id));
        const uniqueNewMovies = newMovies.filter(
          (movie) => !existingIds.has(movie.id)
        );

        console.log(
          `Adding ${uniqueNewMovies.length} unique series (${
            newMovies.length - uniqueNewMovies.length
          } duplicates filtered)`
        );

        if (uniqueNewMovies.length === 0 && newMovies.length > 0) {
          const firstNewMovieId = newMovies[0].id;
          console.log(
            `All series filtered out. First series ID ${firstNewMovieId} already exists in current list.`
          );
          console.log(`Current series count: ${this.movies.length}`);
        }

        this.movies = [...this.movies, ...uniqueNewMovies];
      }

      this.hasMore = response.hasNextPage;
      console.log(
        `Has more series: ${this.hasMore}, total series: ${this.movies.length}, current page: ${response.page}, total pages: ${response.totalPages}`
      );

      if (newMovies.length > 0) {
        this.page++;
        console.log(`Incremented to page ${this.page}`);
      } else {
        console.log('No new series received, keeping same page');
      }
    } catch (err) {
      console.error('Failed to load series:', err);
      this.error = 'Failed to load series. Please try again later.';
    } finally {
      this.loading = false;
    }
  }

  async filterByGenre(genreId: number | null) {
    this.selectedGenre = genreId;
    await this.loadMovies(true);
  }

  private scrollThrottle: any = null;

  @HostListener('window:scroll')
  onScroll() {
    if (this.loading || !this.hasMore) return;

    if (this.scrollThrottle) return;

    this.scrollThrottle = setTimeout(() => {
      this.scrollThrottle = null;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (windowHeight + scrollTop >= documentHeight - 200) {
        console.log('Scroll triggered - loading more series');
        this.loadMovies();
      }
    }, 100);
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
