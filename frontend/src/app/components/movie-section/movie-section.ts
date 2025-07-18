import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { LucideAngularModule } from 'lucide-angular';
import { MovieCardPreview } from '../movie-card-preview/movie-card-preview';
import { Movie } from '../../models/movie.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-section',
  standalone: true,
  imports: [CommonModule, MovieCard, LucideAngularModule, MovieCardPreview],
  templateUrl: './movie-section.html',
  styleUrls: ['./movie-section.css'],
})
export class MovieSection implements AfterViewInit, OnInit {
  @Input() title!: string;
  @Input() endpoint!: string;

  skeletonArray = Array(7);

  @ViewChild('scrollRef', { static: false })
  scrollRef!: ElementRef<HTMLDivElement>;

  movies = signal<Movie[]>([]);
  loading = signal(true);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.endpoint) {
      this.http.get<Movie[]>(this.endpoint).subscribe({
        next: (data) => {
          this.movies.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
        },
      });
    }
  }

  isHovered = signal(false);
  atStart = signal(true);
  atEnd = signal(false);
  cardWidth = signal(0);

  previewMovie = signal<Movie | null>(null);
  previewStyle = signal<Partial<CSSStyleDeclaration> | null>(null);
  previewVisible = signal(false);

  arrowHoverLeft = false;
  arrowHoverRight = false;

  hoverCount = 0;
  previewHideTimeout: any = null;

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

  ngAfterViewInit(): void {
    const container = this.scrollRef.nativeElement;

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

  get movieList(): Movie[] {
    return this.movies();
  }
}
