import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/404/not-found';

export const routes: Routes = [
  {
    path: '',
    title: 'Portada',
    loadComponent: () =>
      import('./core/landing/split-landing/split-landing').then(
        (m) => m.SplitLanding
      ),
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'herosection',
    title: 'hero-section',
    loadComponent: () =>
      import('./features/home/hero-section/hero-section').then(
        (m) => m.HeroSection
      ),
  },
  {
    path: 'tournaments',
    title: 'tournaments',
    loadComponent: () =>
      import('./features/home/tournamentsSection/tournamentsSection').then(
        (m) => m.TournamentSectionComponent
      ),
  },
  {
    path: 'location',
    title: 'location',
    loadComponent: () =>
      import('./features/home/locationSection/locationSection').then(
        (m) => m.LocationSectionComponent
      ),
  },
  {
    path: 'map',
    title: 'map',
    loadComponent: () =>
      import('./components/map/mapComponent').then((m) => m.default),
  },
  {
    path: 'contact',
    title: 'contact',
    loadComponent: () =>
      import('./features/home/contact/contact').then(
        (m) => m.ContactSectionComponent
      ),
  },
  {
    path: 'avisolegal',
    title: 'avisolegal',
    loadComponent: () =>
      import('./core/aviso-legal/aviso-legal').then(
        (m) => m.AvisoLegalComponent
      ),
  },
  {
    path: 'politicaprivacidad',
    title: 'politicaprivacidad',
    loadComponent: () =>
      import('./core/politica-privacidad/politica-privacidad').then(
        (m) => m.PoliticaPrivacidadComponent
      ),
  },
  {
    path: 'cookiesconsent',
    title: 'cookies-consent',
    loadComponent: () =>
      import('./core/cookies-consent/cookies-consent').then(
        (m) => m.CookieConsentComponent
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
