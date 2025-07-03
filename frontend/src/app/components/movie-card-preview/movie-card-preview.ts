import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card-preview.html',
  styleUrls: ['./movie-card-preview.css'],
})
export class MovieCardPreview {
  @Input() movie!: {
    title: string;
    image: string;
    match: number;
    rating: string;
    year: number;
    genres: string[];
  };

  @Input() previewStyle!: Partial<CSSStyleDeclaration>;
}
