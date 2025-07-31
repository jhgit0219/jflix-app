import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [FormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    this.error = '';
    try {
      const user = await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('/');
    } catch (err) {
      this.error = 'Login failed. Please check your credentials.';
    }
  }
}
