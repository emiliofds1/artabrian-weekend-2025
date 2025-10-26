import { Component, Input } from '@angular/core';

@Component({
  selector: 'sponsors',
  standalone: true,
  templateUrl: './sponsors.html',
})
export class SponsorsComponent {
  @Input() principalSponsors: { name: string; logo: string }[] = [
    { name: 'Sponsor 1', logo: 'assets/images/sponsors/logo-ferrol.webp' },
    { name: 'Sponsor 2', logo: 'assets/images/sponsors/logo-cardmarket.webp' },
  ];
  @Input() secondarySponsors: { name: string; logo: string }[] = [
    {
      name: 'Sponsor 1',
      logo: 'assets/images/sponsors/logo-random-player.webp',
    },
    { name: 'Sponsor 2', logo: 'assets/images/sponsors/logo-vip.webp' },
    { name: 'Sponsor 3', logo: 'assets/images/sponsors/logo-xpoly.webp' },

    {
      name: 'Sponsor 4',
      logo: 'assets/images/sponsors/logo-caprica.webp',
    },
    { name: 'Sponsor 5', logo: 'assets/images/sponsors/logo-percalandia.webp' },
  ];
}
