import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { UserService, UserData } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-account',
  templateUrl: './account.html',
  imports: [CommonModule, RouterModule, Navbar],
})
export class AccountComponent implements OnInit {
  user: UserData | null = null;
  isAuthenticated = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.isAuthenticated = !!user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  updateProfile() {
    // TODO: Implement profile update functionality
  }

  changePassword() {
    // TODO: Implement password change functionality
  }
}
