import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { LucideAngularModule } from 'lucide-angular';
import { MovieCardPreview } from '../movie-card-preview/movie-card-preview';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-section',
  standalone: true,
  imports: [CommonModule, MovieCard, LucideAngularModule, MovieCardPreview],
  templateUrl: './movie-section.html',
  styleUrls: ['./movie-section.css'],
})
export class MovieSection implements AfterViewInit {
  @ViewChild('scrollRef', { static: false })
  scrollRef!: ElementRef<HTMLDivElement>;

  placeholderMovies = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `Movie ${i + 1}`,
    image: '/placeholder.jpg',
    match: 98 - i, // Fake match %
    rating: i % 2 === 0 ? '18+' : '13+',
    year: 2019 + (i % 5),
    genres: ['Action', 'Adventure', 'Thriller'].slice(0, (i % 3) + 1),
  }));

  isHovered = signal(false);
  atStart = signal(true);
  atEnd = signal(false);
  cardWidth = signal(0);

  previewMovie = signal<Movie | null>(null);
  previewStyle = signal<Partial<CSSStyleDeclaration> | null>(null);

  arrowHoverLeft = false;
  arrowHoverRight = false;

  ngAfterViewInit(): void {
    const container = this.scrollRef.nativeElement;

    // Initial scroll state after layout
    setTimeout(() => this.updateScrollEdges(), 0);

    container.addEventListener('scroll', this.updateScrollEdges);

    const observer = new ResizeObserver(() => {
      const firstCard = container.querySelector('.movie-card');
      if (firstCard instanceof HTMLElement) {
        this.cardWidth.set(firstCard.offsetWidth + 16);
      }
      this.updateScrollEdges();
    });

    observer.observe(container);
  }

  updateScrollEdges = () => {
    const container = this.scrollRef.nativeElement;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    this.atStart.set(scrollLeft <= 0);
    this.atEnd.set(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  scroll(direction: 'left' | 'right') {
    const container = this.scrollRef.nativeElement;
    const width = this.cardWidth();
    if (!width) return;

    const visibleCards = Math.floor(container.offsetWidth / width);
    const scrollAmount = width * visibleCards;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }

  showPreview(event: MouseEvent, movie: Movie) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    const expandedWidth = rect.width * 1.5;
    const leftOffset = rect.left - (expandedWidth - rect.width) / 2;
    const clampedLeft = Math.max(
      8,
      Math.min(leftOffset, window.innerWidth - expandedWidth - 8)
    );
    const clampedTop = Math.max(8, rect.top - 80);

    this.previewMovie.set(movie);
    this.previewStyle.set({
      top: `${clampedTop}px`,
      left: `${clampedLeft}px`,
      width: `${expandedWidth}px`,
    });
  }

  hidePreview() {
    this.previewMovie.set(null);
    this.previewStyle.set(null);
  }
}
