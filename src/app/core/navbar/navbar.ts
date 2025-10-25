import {
  Component,
  Input,
  signal,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent implements OnChanges {
  @Input() pageSections: { id: string; title: string }[] = [];

  activeSection = signal<string>('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pageSections'] && this.pageSections.length > 0) {
      this.activeSection.set(this.pageSections[0].id);
    }
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    this.activeSection.set(id);
  }
}
