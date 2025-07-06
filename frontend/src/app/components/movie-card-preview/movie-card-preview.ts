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

  onHoverEnterInternal() {
    this.hoverEnter.emit();
  }

  onHoverLeave() {
    this.hoverLeave.emit();
  }

  playMovie(movie: Movie) {
    // TODO: Replace with actual video player navigation
    console.log('Playing movie:', movie.title);
    // Example: this.router.navigate(['/watch', movie.id]);
  }

  addToList(movie: Movie) {
    // TODO: Call a service or emit an event to add to watchlist
    console.log('Added to list:', movie.title);
    // Example: this.userService.addToWatchlist(movie);
  }

  toggleDetails(movie: Movie) {
    // TODO: Show a modal or expand more info below
    console.log('Toggling details for:', movie.title);
    // Example: this.showDetails = !this.showDetails;
  }
  likeMovie(movie: Movie) {
    console.log('Liked:', movie.title);
    // TODO: Call a service or emit event to store like
  }

  dislikeMovie(movie: Movie) {
    console.log('Disliked:', movie.title);
    // TODO: Call a service or emit event to store dislike
  }
}
