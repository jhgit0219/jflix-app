import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../../components/navbar/navbar';
import { HeroSection } from '../../components/hero-section/hero-section';
import { MovieSection } from '../../components/movie-section/movie-section';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

interface HomeSection {
  title: string;
  endpoint: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, HeroSection, MovieSection],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  sections: HomeSection[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const baseUrl = environment.api.backend;
    console.log('Base URL:', baseUrl);

    this.http
      .get<{ id: number; name: string }[]>(`${baseUrl}/api/movies/genres`)
      .subscribe({
        next: (genres) => {
          const genreMap = new Map(
            genres.map((g) => [g.name.toLowerCase(), g.id])
          );

          this.sections = [
            {
              title: 'Trending Now',
              endpoint: `${baseUrl}/api/movies/category/popular`,
            },
            {
              title: 'Top Rated',
              endpoint: `${baseUrl}/api/movies/category/top_rated`,
            },
            {
              title: 'Action',
              endpoint: `${baseUrl}/api/movies/genre/${genreMap.get('action')}`,
            },
            {
              title: 'Comedy',
              endpoint: `${baseUrl}/api/movies/genre/${genreMap.get('comedy')}`,
            },
          ];

          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load genres:', err);

          this.sections = [
            { title: 'Trending Now', endpoint: '' },
            { title: 'Top Rated', endpoint: '' },
            { title: 'Action', endpoint: '' },
            { title: 'Comedy', endpoint: '' },
          ];

          this.loading = false;
        },
      });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 0);
  }
}
