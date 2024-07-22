import { Routes } from '@angular/router';
import { ContactListComponent } from './features/components/contact-list/contact-list.component';
import { NewContactFormComponent } from './features/components/new-contact-form/new-contact-form.component';
import { EditContactFormComponent } from './features/components/edit-contact-form/edit-contact-form.component';

export const routes: Routes = [
  {
    path: '',
    component: ContactListComponent,
  },
  {
    path: 'new',
    component: NewContactFormComponent,
  },
  {
    path: 'contact/:id',
    component: EditContactFormComponent,
  },
];
