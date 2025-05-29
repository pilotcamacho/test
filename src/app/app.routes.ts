import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./auth/sign-up/sign-up.page').then(m => m.SignUpPage)
  },
  {
    path: 'confirm',
    loadComponent: () => import('./auth/confirm/confirm.page').then(m => m.ConfirmPage)
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./auth/sign-in/sign-in.page').then(m => m.SignInPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
];
