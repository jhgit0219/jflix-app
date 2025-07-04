import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero-section.html',
})
export class HeroSection implements OnInit {
  movie: any = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const url = `${environment.api.backend}/api/movies/category/popular`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        const movies = Array.isArray(res) ? res : res.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        this.movie = randomMovie;

        console.log('API response:', res);
        console.log('Featured movie:', this.movie);
        console.log('Backdrop URL:', this.backdropUrl);
        console.log('Description:', this.description);

        this.cdr.detectChanges(); // Ensure view updates
      },
      error: (err) => {
        console.error('Failed to fetch featured movie:', err);
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
