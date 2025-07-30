import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  standalone: true,
  selector: 'app-kids',
  templateUrl: './kids.html',
  imports: [CommonModule, RouterModule, Navbar],
})
export class KidsComponent {
  kidsContent = [
    { id: 1, title: 'Toy Story', genre: 'Animation', age: 'G', year: 1995 },
    { id: 2, title: 'Finding Nemo', genre: 'Animation', age: 'G', year: 2003 },
    { id: 3, title: 'Frozen', genre: 'Animation', age: 'G', year: 2013 },
    { id: 4, title: 'The Lion King', genre: 'Animation', age: 'G', year: 1994 },
    {
      id: 5,
      title: 'Spider-Man: Into the Spider-Verse',
      genre: 'Animation',
      age: 'PG',
      year: 2018,
    },
    { id: 6, title: 'Coco', genre: 'Animation', age: 'PG', year: 2017 },
  ];

  categories = ['All', 'Animation', 'Adventure', 'Comedy', 'Educational'];
  selectedCategory = 'All';

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredContent() {
    if (this.selectedCategory === 'All') {
      return this.kidsContent;
    }
    return this.kidsContent.filter(
      (content) => content.genre === this.selectedCategory
    );
  }
}
