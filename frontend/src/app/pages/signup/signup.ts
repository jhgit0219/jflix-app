import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.html',
  imports: [FormsModule, CommonModule, RouterModule],
})
export class SignupComponent {
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  async signup() {
    this.error = '';

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return;
    }

    this.loading = true;
    try {
      console.log('Signup attempt:', {
        email: this.email,
        password: this.password,
      });
      this.router.navigateByUrl('/');
    } catch (err) {
      this.error = 'Signup failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
