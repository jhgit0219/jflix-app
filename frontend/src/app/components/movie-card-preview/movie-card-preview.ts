import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() width?: string;
  @Input() visible: boolean = false;

  @Output() hoverEnter = new EventEmitter<void>();
  @Output() hoverLeave = new EventEmitter<void>();

  onHoverEnterInternal() {
    this.hoverEnter.emit();
  }

  onHoverLeave() {
    this.hoverLeave.emit();
  }
}
