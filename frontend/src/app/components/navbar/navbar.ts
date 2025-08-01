import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService, UserData } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit, OnDestroy {
  user: UserData | null = null;
  scrolled = false;
  searchQuery = '';
  private sub!: Subscription;

  navLinks = [
    { label: "What's New", href: '/', requiresAuth: false },
    { label: 'Movies', href: '/movies', requiresAuth: false },
    { label: 'Series', href: '/series', requiresAuth: false },
    { label: 'Kids', href: '/kids', requiresAuth: false },
    { label: 'My List', href: '/my-list', requiresAuth: true },
    { label: 'Account', href: '/account', requiresAuth: true },
  ];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onScroll();
    this.userService.restoreUser();
    this.sub = this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrolled = window.scrollY > 20;
  }

  onSearchKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.performSearch();
    }
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery.trim() },
      });
    }
  }

  logout() {
    // Delay user clearing until after reload
    setTimeout(() => {
      this.userService.logout();
    }, 0);

    location.reload(); // triggers before the DOM visibly changes
  }
}
