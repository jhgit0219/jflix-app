import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.html',
})
export class MovieCard {
  @Input() movie!: Movie;

  usesFallbackImage = false;
  private fallbackImageUrl =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjMUExQTFBIi8+CjxwYXRoIGQ9Ik0xNzUgODBIMjI1VjE0NUgxNzVWODBaIiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik0xODcuNSA5Ny41TDIwNy41IDExNy41TDE4Ny41IDEzNy41VjEyNy41SDE5N1YxMDcuNUgxODcuNVY5Ny41WiIgZmlsbD0iIzY2NjY2NiIvPgo8L3N2Zz4K';

  getBackdropImage(): string {
    if (this.movie.backdrop || this.movie.image) {
      this.usesFallbackImage = false;
      return this.movie.backdrop || this.movie.image || this.fallbackImageUrl;
    }

    this.usesFallbackImage = true;
    return this.fallbackImageUrl;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target.src !== this.fallbackImageUrl) {
      this.usesFallbackImage = true;
      target.src = this.fallbackImageUrl;
    }
  }
}
