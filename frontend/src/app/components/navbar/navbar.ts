import { Component } from '@angular/core';
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

  ngOnInit(): void {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (firebaseUser) => {
      this.user = firebaseUser;
    });
  }
}
