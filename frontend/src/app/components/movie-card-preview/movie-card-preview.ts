import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import {
  LucideAngularModule,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Play,
  Plus,
} from 'lucide-angular';

@Component({
  selector: 'app-movie-card-preview',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './movie-card-preview.html',
  styleUrls: ['./movie-card-preview.css'],
})
export class MovieCardPreview {
  @Input() movie!: Movie;
  @Input() previewStyle!: Partial<CSSStyleDeclaration>;
  @Input() width?: string;
  @Input() visible: boolean = false;

  @Output() hoverEnter = new EventEmitter<void>();
  @Output() hoverLeave = new EventEmitter<void>();

  readonly ThumbsUp = ThumbsUp;
  readonly ThumbsDown = ThumbsDown;
  readonly ChevronDown = ChevronDown;
  readonly Play = Play;
  readonly Plus = Plus;

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

  onHoverEnterInternal() {
    this.hoverEnter.emit();
  }

  onHoverLeave() {
    this.hoverLeave.emit();
  }

  playMovie(movie: Movie) {
    // TODO: Implement play functionality
  }

  addToList(movie: Movie) {
    // TODO: Implement add to list functionality
  }

  toggleDetails(movie: Movie) {
    // TODO: Implement details toggle functionality
  }

  likeMovie(movie: Movie) {
    // TODO: Implement like functionality
  }

  dislikeMovie(movie: Movie) {
    // TODO: Implement dislike functionality
  }
}
