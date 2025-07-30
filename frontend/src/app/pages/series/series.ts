import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  standalone: true,
  selector: 'app-series',
  templateUrl: './series.html',
  imports: [CommonModule, RouterModule, Navbar],
})
export class SeriesComponent {
  series = [
    { id: 1, title: 'Breaking Bad', genre: 'Drama', seasons: 5, year: 2008 },
    {
      id: 2,
      title: 'Game of Thrones',
      genre: 'Fantasy',
      seasons: 8,
      year: 2011,
    },
    {
      id: 3,
      title: 'Stranger Things',
      genre: 'Sci-Fi',
      seasons: 4,
      year: 2016,
    },
    { id: 4, title: 'The Office', genre: 'Comedy', seasons: 9, year: 2005 },
    { id: 5, title: 'Friends', genre: 'Comedy', seasons: 10, year: 1994 },
    {
      id: 6,
      title: 'The Walking Dead',
      genre: 'Horror',
      seasons: 11,
      year: 2010,
    },
  ];

  genres = [
    'All',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Sci-Fi',
    'Thriller',
  ];
  selectedGenre = 'All';

  filterByGenre(genre: string) {
    this.selectedGenre = genre;
  }

  get filteredSeries() {
    if (this.selectedGenre === 'All') {
      return this.series;
    }
    return this.series.filter((show) => show.genre === this.selectedGenre);
  }
}
