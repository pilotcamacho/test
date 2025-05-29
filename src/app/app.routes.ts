import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then(m => m.SplashPage)
  },
  // {
  //   path: 'sign-up',
  //   loadComponent: () => import('./auth/sign-up/sign-up.page').then(m => m.SignUpPage)
  // },
  // {
  //   path: 'confirm',
  //   loadComponent: () => import('./auth/confirm/confirm.page').then(m => m.ConfirmPage)
  // },
  // {
  //   path: 'sign-in',
  //   loadComponent: () => import('./auth/sign-in/sign-in.page').then(m => m.SignInPage)
  // },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'authentication',
    loadComponent: () => import('./auth/authentication/authentication.page').then( m => m.AuthenticationPage)
  },


];
