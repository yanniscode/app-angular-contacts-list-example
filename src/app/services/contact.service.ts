import { Injectable } from '@angular/core';
import { Contact } from '../datas/contact';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
// import { CONTACTS } from '../datas/mock-contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  contactToUpdate ?: Contact;
  // contactIndex: number = -1;

  private contactsUrl = 'http://localhost:8080/api/contacts'; // URL de l'API
  // private contactsUrl = 'api/contacts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getContacts(): Observable<Contact[]> {
    // V2 -avec appel http:
    return this.http.get<Contact[]>(this.contactsUrl)
    .pipe(
      tap(_ => this.log('fetched contacts')),
      catchError(this.handleError<Contact[]>('getContacts', []))
    );

    // // V1 - test mocké sans appel http
    // const contacts = of(CONTACTS);
    // return contacts;
  }

  addContact(contact: Contact): Observable<Contact> {
    console.log("addContact");
    // V2: 
    return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions)
    .pipe(
      tap((newContact: Contact) => this.log(`added contact w/ id=${newContact.id}`)),
      catchError(this.handleError<Contact>('addContact'))
    );

    // V1:
    // this.getContacts().subscribe(contacts => this.contacts = contacts);
    // console.log(this.contacts);
    // this.contacts.push(contact);
  }

  updateContact(contact: Contact): Observable<any> {
    console.log("updateContact");
    // V2:
    return this.http.put<Contact>(this.contactsUrl, contact, this.httpOptions).pipe(
      tap(_ => this.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<any>('updateContact'))
    );

    // V1:
    // this.getContacts().subscribe(contacts => this.contacts = contacts);
    // console.log(this.contacts);
    // this.contactToUpdate = this.contacts.find((contactInList) => contactInList.id === contact.id);
    // console.log(this.contactToUpdate);
  }

  deleteContact(contactId: number): Observable<Contact> {
    console.log("deleteContact"+ contactId);
    // V2:
    const url = `${this.contactsUrl}/${contactId}`;

    return this.http.delete<Contact>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted contact id=${contactId}`)),
      catchError(this.handleError<Contact>('deleteContact'))
    );
    
    // V1:
    // this.getContacts().subscribe(contacts => this.contacts = contacts);
    // console.log(this.contacts);
    // if(contactId) {
    //   // index de l'élément à supprimer:
    //   this.contactIndex = this.contacts.findIndex((contact) => contact.id === contactId);
    //   this.contacts.splice(this.contactIndex, 1);
    // }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    /** Log a ContactService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`ContactService: ${message}`);
    }

}
