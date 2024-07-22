import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/contact';

  findAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  create(contact: any): Observable<Contact> {
    return this.http
      .post<Contact>(`${this.apiUrl}`, contact)
      .pipe(catchError(this.handleError));
  }

  findById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/find/${id}`);
  }

  findByName(name: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/${name}`);
  }

  update(contact: Contact): Observable<Contact> {
    return this.http
      .put<Contact>(`${this.apiUrl}`, contact)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  partiallyUpdate(contact: any): Observable<Contact> {
    return this.http.patch<Contact>(this.apiUrl, contact);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '¡Ocurrió un error desconocido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
