import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { TournamentEvent } from '../models/tournament-event.model';

@Injectable({
  providedIn: 'root',
})
export class TournamentEventService {
  private jsonUrl = 'assets/data/tournament-event.json';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<TournamentEvent[]> {
    return this.http.get<TournamentEvent[]>(this.jsonUrl).pipe(
      tap((events) => {
        const ids = events.map((e) => e.id);
        const duplicateIds = ids.filter(
          (id, index) => ids.indexOf(id) !== index
        );
        if (duplicateIds.length > 0) {
          console.warn('Warning: IDs duplicados en eventos:', duplicateIds);
        }
      }),
      catchError((error) => {
        console.error('Error cargando eventos:', error);
        return of([]);
      })
    );
  }

  getEventById(id: string): Observable<TournamentEvent | undefined> {
    return this.getEvents().pipe(
      map((events) => events.find((e) => e.id === id)),
      catchError((error) => {
        console.error('Error buscando evento por ID:', error);
        return of(undefined);
      })
    );
  }
}
