import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-my-list',
  templateUrl: './my-list.html',
  imports: [CommonModule, RouterModule, Navbar],
})
export class MyListComponent implements OnInit {
  watchlist = [
    { id: 1, title: 'The Dark Knight', type: 'Movie', addedDate: '2024-01-15' },
    { id: 2, title: 'Breaking Bad', type: 'Series', addedDate: '2024-01-10' },
    { id: 3, title: 'Inception', type: 'Movie', addedDate: '2024-01-05' },
    {
      id: 4,
      title: 'Stranger Things',
      type: 'Series',
      addedDate: '2023-12-20',
    },
  ];

  isAuthenticated = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  removeFromWatchlist(id: number) {
    this.watchlist = this.watchlist.filter((item) => item.id !== id);
  }

  get filteredWatchlist() {
    return this.watchlist;
  }
}
