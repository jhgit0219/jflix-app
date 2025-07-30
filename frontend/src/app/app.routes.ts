import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup').then((m) => m.SignupComponent),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./pages/movies').then((m) => m.MoviesComponent),
  },
  {
    path: 'series',
    loadComponent: () =>
      import('./pages/series').then((m) => m.SeriesComponent),
  },
  {
    path: 'kids',
    loadComponent: () => import('./pages/kids').then((m) => m.KidsComponent),
  },
  {
    path: 'my-list',
    loadComponent: () =>
      import('./pages/my-list').then((m) => m.MyListComponent),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./pages/account').then((m) => m.AccountComponent),
  },
];
