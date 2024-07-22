import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { RouterModule } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  private contactService = inject(ContactService);
  private messageService = inject(MessageService);
  contactList: Contact[] = [];
  stateMessage: string = '';

  ngOnInit(): void {
    this.loadContactList();
    this.messageService.currentMessage.subscribe((message) => {
      this.stateMessage = message;
      if (this.stateMessage) {
        setTimeout(() => {
          this.stateMessage = '';
          this.messageService.changeMessage('');
        }, 4000);
      }
    });
  }

  private loadContactList() {
    this.contactService.findAll().subscribe({
      next: (contacts: Contact[]) => {
        this.contactList = contacts;
      },
    });
  }

  findContact(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const contactName = inputElement.value;
    if (contactName != '') {
      if (contactName.length > 2) {
        this.contactService.findByName(contactName).subscribe({
          next: (contacts: Contact[]) => {
            if (contacts != null) {
              this.contactList = contacts;
            } else {
              this.contactList = [];
            }
          },
        });
      }
    } else {
      this.loadContactList();
    }
  }

  delete(id: number) {
    this.contactService.delete(id).subscribe({
      next: () => {
        this.messageService.changeMessage(
          `Contacto (${id}) eliminado con éxito.`
        );
        this.loadContactList();
      },
    });
  }
}
