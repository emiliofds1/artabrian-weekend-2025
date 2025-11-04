import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TournamentEventService } from '../../../services/tournament-event.service';
import { TournamentCardComponent } from './tournamentCard/tournamentCard';

@Component({
  selector: 'tournament-section',
  standalone: true,
  imports: [CommonModule, TournamentCardComponent],
  templateUrl: './tournamentSection.html',
})
export class TournamentSectionComponent {
  private eventService = inject(TournamentEventService);

  @Input() tcgId: string | null = null;

  private eventsSignal = toSignal(this.eventService.getEvents(), {
    initialValue: [],
  });

  // Array of days for tabs
  readonly days = ['viernes', 'sábado', 'domingo'] as const;

  // Compute events by TCG and day with filter to omit "standard" on Saturday
  private eventsByDay = computed(() => {
    const id = this.tcgId ?? 'mtg';
    const events = this.eventsSignal().filter((e) => e.id === id);
    return {
      viernes: events.filter((e) => e.day.toLowerCase() === 'viernes'),
      sábado: events
        .filter((e) => e.day.toLowerCase() === 'sábado')
        .filter((e) => e.name !== 'standard'), // Omitir solo "standard" en sábado
      domingo: events.filter((e) => e.day.toLowerCase() === 'domingo'),
    };
  });

  viernesEvents = computed(() => this.eventsByDay().viernes);
  sabadoEvents = computed(() => this.eventsByDay().sábado);
  domingoEvents = computed(() => this.eventsByDay().domingo);

  selectedDay = signal<'viernes' | 'sábado' | 'domingo'>('viernes');

  // Exceptions
  isSabadoMtg4Eventos = computed(
    () =>
      this.selectedDay() === 'sábado' &&
      this.tcgId === 'mtg' &&
      this.sabadoEvents().length === 3
  );

  isDomingoMtgLarge = computed(
    () => this.selectedDay() === 'domingo' && this.tcgId === 'mtg'
  );

  sabadoGridCols = computed(() =>
    this.isSabadoMtg4Eventos()
      ? 'grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6'
      : this.tcgId === 'swu'
      ? 'grid-cols-1 md:grid-cols-2 gap-12'
      : 'grid-cols-1 md:grid-cols-4 gap-12'
  );

  domingoGridCols = computed(() =>
    this.isDomingoMtgLarge()
      ? 'grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6'
      : this.tcgId === 'swu'
      ? 'grid-cols-1 md:grid-cols-2 gap-12'
      : 'grid-cols-1 md:grid-cols-3 gap-12'
  );

  // trackBy for *ngFor
  trackById(index: number, event: any) {
    return event.id;
  }
}
