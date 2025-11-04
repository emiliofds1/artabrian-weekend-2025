import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { TournamentSplitService } from '../../../services/tournament-split.service';
import { CookieConsentComponent } from '../../cookies-consent/cookies-consent';

@Component({
  selector: 'split-landing',
  standalone: true,
  templateUrl: './split-landing.html',
  imports: [CookieConsentComponent],
})
export class SplitLanding implements OnInit {
  private splitService = inject(TournamentSplitService);
  private router = inject(Router);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  hoveredPanelIndex: number | null = null;

  splits = toSignal(this.splitService.getSplits(), { initialValue: [] });

  tournamentName = computed(() => this.splits()[0]?.name ?? null);

  ngOnInit() {
    const tourName = this.tournamentName();
    // Definir título dinámico relevante para SEO
    this.titleService.setTitle(
      `${tourName ?? 'Artabrian Weekend'} - Descubre los torneos disponibles`
    );
    // Definir meta descripción dinámica para SEO
    this.metaService.updateTag({
      name: 'description',
      content: `Explora los torneos de ${
        tourName ?? 'Artabrian Weekend'
      }, participa en torneos de Magic: The Gathering, Star Wars Unlimited y más en Ferrolterra y A Coruña.`,
    });
  }

  onHover(index: number) {
    this.hoveredPanelIndex = index;
  }

  onLeave() {
    this.hoveredPanelIndex = null;
  }

  goToTournament(split: { id: string; name: string }) {
    this.router.navigate(['/home'], { queryParams: { tcgId: split.id } });
  }
}
