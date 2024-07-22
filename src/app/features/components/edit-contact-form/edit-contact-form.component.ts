import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-edit-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './edit-contact-form.component.html',
  styleUrl: './edit-contact-form.component.css',
})
export class EditContactFormComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private contactService = inject(ContactService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  contactFinded: Contact | null = null;
  id: number | string | null = null;
  message: string = '';
  errorMessage: string = '';

  editContactform = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(120)],
    ],
    phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.contactService.findById(+this.id).subscribe({
        next: (contact) => {
          if (contact != null) {
            this.contactFinded = contact;
            this.editContactform.patchValue(this.contactFinded);
          } else {
            this.router.navigate(['/']);
          }
        },
      });
    }
  }

  update() {
    let newName: string = this.editContactform.get('name')?.value || '';
    let newEmail: string = this.editContactform.get('email')?.value || '';
    let newPhoneNumber: string =
      this.editContactform.get('phoneNumber')?.value || '';

    if (newName != '' && newEmail != '' && newPhoneNumber != '') {
      const updatedContact: Contact = {
        id: +this.id!,
        name: newName,
        email: newEmail,
        phoneNumber: newPhoneNumber,
      };
      
      this.contactService.update(updatedContact).subscribe({
        next: () => {
          this.messageService.changeMessage(`Contacto (${this.id}) actualizado con éxito.`);
          this.router.navigate(['/']);
        },
        error: (error: Error) => {
          this.message = '';
          this.errorMessage = error.message;
        },
      });
    } else {
      this.message = 'Llene los campos.';
    }
  }
}
