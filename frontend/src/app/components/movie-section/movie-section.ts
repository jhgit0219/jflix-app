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

@Component({
  selector: 'app-movie-section',
  standalone: true,
  imports: [CommonModule, MovieCard, LucideAngularModule],
  templateUrl: './movie-section.html',
  styleUrls: ['./movie-section.css'],
})
export class MovieSection implements AfterViewInit {
  @ViewChild('scrollRef', { static: false })
  scrollRef!: ElementRef<HTMLDivElement>;

  placeholderMovies = Array.from({ length: 20 }, (_, i) => ({
    title: `Movie ${i + 1}`,
    image: '/placeholder.jpg',
  }));

  isHovered = signal(false);
  atStart = signal(true);
  atEnd = signal(false);
  cardWidth = signal(0);

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
}
