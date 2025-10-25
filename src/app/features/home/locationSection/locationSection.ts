import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TournamentLocation } from '../../../models/tournament-location.model';
import MapComponent from '../../../components/map/mapComponent';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'location-section',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './locationSection.html',
})
export class LocationSectionComponent implements AfterViewInit, OnChanges {
  @Input() locationData: TournamentLocation | null = null;
  @ViewChild('galleryContainer', { static: false })
  galleryContainer!: ElementRef<HTMLDivElement>;

  imagePaths: string[] = [];
  currentIndex = 0;
  imageTransitioning = false;
  fullscreenMode = false;

  constructor(private http: HttpClient) {
    this.loadImages();
  }

  async loadImages() {
    try {
      const images: string[] = await firstValueFrom(
        this.http.get<string[]>('assets/images/event/images.json')
      );
      this.imagePaths = images.map((img) => `assets/images/event/${img}`);
    } catch (err) {
      console.error('Failed to load event images:', err);
    }
  }

  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['locationData']) {
      this.currentIndex = 0;
      this.scrollToImage(this.currentIndex);
    }
  }

  goPrev() {
    this.imageTransitioning = true;
    setTimeout(() => {
      this.currentIndex =
        (this.currentIndex - 1 + this.imagePaths.length) %
        this.imagePaths.length;
      this.scrollToImage(this.currentIndex);
      this.imageTransitioning = false;
    }, 200);
  }

  goNext() {
    this.imageTransitioning = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.imagePaths.length;
      this.scrollToImage(this.currentIndex);
      this.imageTransitioning = false;
    }, 200);
  }

  scrollToImage(index: number) {
    const container = this.galleryContainer?.nativeElement;
    if (container && container.children[index]) {
      (container.children[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }

  openFullscreen() {
    this.fullscreenMode = true;
  }

  closeFullscreen() {
    this.fullscreenMode = false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') this.goPrev();
    if (event.key === 'ArrowRight') this.goNext();
    if (event.key === 'Escape') this.closeFullscreen();
  }

  get backgroundPath(): string {
    return this.locationData?.backgroundPath ?? '';
  }

  get adress(): string {
    return this.locationData?.adress ?? '';
  }

  get latitude(): number {
    return 42.8806;
  }

  get longitude(): number {
    return -8.5457;
  }
}
