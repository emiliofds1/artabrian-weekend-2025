import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'contact-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
})
export class ContactSectionComponent {
  // Esta función solo previene el submit si el formulario no es válido
  onSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      event.preventDefault();
      alert('Por favor rellena todos los campos correctamente.');
    }
  }
}
