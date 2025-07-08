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
  // {
  //   path: 'signup',
  //   loadComponent: () => import('./pages/signup/signup').then((m) => m.Signup),
  // },
  // {
  //   path: 'account',
  //   loadComponent: () =>
  //     import('./pages/account/account').then((m) => m.Account),
  // },
];
