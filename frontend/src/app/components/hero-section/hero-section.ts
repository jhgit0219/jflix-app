import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { timeout, retry } from 'rxjs/operators';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero-section.html',
})
export class HeroSection implements OnInit {
  movie: any = null;
  loading = true;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const url = `${environment.api.backend}/api/movies/category/popular`;

    this.http
      .get<any>(url)
      .pipe(timeout(60000), retry(2))
      .subscribe({
        next: (res) => {
          const movies = Array.isArray(res) ? res : res.results;
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          this.movie = randomMovie;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to fetch featured movie:', err);
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }

  get backdropUrl(): string {
    return this.movie?.backdrop || '';
  }

  get description(): string {
    return this.movie?.description || 'No description available.';
  }
}
