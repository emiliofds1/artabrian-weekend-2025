import { Component, computed, inject, signal } from '@angular/core';
import { HeroSection } from './hero-section/hero-section';
import { ActivatedRoute } from '@angular/router';
import { TournamentSectionComponent } from './tournamentsSection/tournamentsSection';
import { LocationSectionComponent } from './locationSection/locationSection';
import { ContactSectionComponent } from './contact/contact';
import { FooterComponent } from '../../core/footer/footer';
import { NavbarComponent } from '../../core/navbar/navbar';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    HeroSection,
    TournamentSectionComponent,
    LocationSectionComponent,
    FooterComponent,
    ContactSectionComponent,
    NavbarComponent,
  ],
  templateUrl: './home.html',
})
export class Home {
  private route = inject(ActivatedRoute);

  tcgId = signal<string | null>(null);

  selectedTcgName = computed(() => {
    const id = this.tcgId();
    if (id === 'mtg') return 'Magic: The Gathering';
    if (id === 'swu') return 'Star Wars Unlimited';
    return 'Selecciona un TCG';
  });

  pageSections = [
    { id: 'home', title: 'Inicio' },
    { id: 'tournaments', title: 'Torneos' },
    { id: 'location', title: 'Localización' },
    { id: 'contact', title: 'Contacto' },
  ];

  activeSection = signal<string>('home');
  locationJson = {
    backgroundPath: 'assets/images/location/location.jpg',
    adress: 'San Pedro de Leixa 82, 15405 Ferrol, Galicia',
    geopath: 'https://maps.app.goo.gl/2YgpBSwLQirCn7wo7',
  };

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      this.tcgId.set(params.get('tcgId'));
    });
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    this.activeSection.set(id);
  }
}
