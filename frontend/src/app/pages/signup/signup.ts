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
      await this.authService.signup(this.email, this.password);
      this.router.navigateByUrl('/');
    } catch (err: any) {
      console.error('Signup error:', err);

      // Handle Firebase auth errors
      if (err.code === 'auth/email-already-in-use') {
        this.error =
          'An account with this email already exists. Please try logging in instead.';
      } else if (err.code === 'auth/invalid-email') {
        this.error = 'Please enter a valid email address.';
      } else if (err.code === 'auth/weak-password') {
        this.error = 'Password is too weak. Please choose a stronger password.';
      } else if (err.code === 'auth/network-request-failed') {
        this.error =
          'Network error. Please check your internet connection and try again.';
      } else {
        this.error = 'Signup failed. Please try again.';
      }
    } finally {
      this.loading = false;
    }
  }
}
