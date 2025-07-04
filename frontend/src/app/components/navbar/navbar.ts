import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../../environments/firebase.config';

import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  user: any = null;
  scrolled = false;

  navLinks = [
    { label: "What's New", href: '#' },
    { label: 'Movies', href: '#' },
    { label: 'Series', href: '#' },
    { label: 'Kids', href: '#' },
    { label: 'My List', href: '#' },
  ];

  ngOnInit(): void {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (firebaseUser) => {
      this.user = firebaseUser;
    });

    this.onScroll(); // initialize scroll state
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrolled = window.scrollY > 20;
  }
}
