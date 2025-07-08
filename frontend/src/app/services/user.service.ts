import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserData {
  uid: string;
  email: string;
  name?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<UserData | null>(null);
  readonly user$ = this.userSubject.asObservable();

  setUser(user: UserData) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  restoreUser() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.userSubject.next(JSON.parse(stored));
    }
  }
  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }
}
