import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { MessageService } from '../../services/message.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-new-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './new-contact-form.component.html',
  styleUrl: './new-contact-form.component.css',
})
export class NewContactFormComponent {
  private formBuilder = inject(FormBuilder);
  private contactService = inject(ContactService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  errorMessage: string | null = null;

  newContactform = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(120)],
    ],
    phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
  });

  create() {
    const contact = this.newContactform.value;
    this.contactService.create(contact).subscribe({
      next: (contact: Contact) => {
        this.messageService.changeMessage(`Contacto (${contact.name}) agregado con éxito.`);
        this.router.navigate(['/']);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
