import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { auth } from '../../environments/firebase.config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  async signup(email: string, password: string) {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const idToken = await userCredential.user.getIdToken();

    if (!idToken) {
      throw new Error('Failed to retrieve ID token');
    }

    localStorage.setItem('idToken', idToken);

    const user = await firstValueFrom(
      this.http.post<{ uid: string; email: string }>(
        `${environment.api.backend}/api/auth/verify-token`,
        { idToken }
      )
    );

    this.userService.setUser(user);
    return user;
  }

  async login(email: string, password: string) {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const idToken = await userCredential.user.getIdToken();

    if (!idToken) {
      throw new Error('Failed to retrieve ID token');
    }

    localStorage.setItem('idToken', idToken);

    const user = await firstValueFrom(
      this.http.post<{ uid: string; email: string }>(
        `${environment.api.backend}/api/auth/verify-token`,
        { idToken }
      )
    );

    this.userService.setUser(user);
    return user;
  }
}
