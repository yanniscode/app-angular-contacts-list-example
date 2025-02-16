import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from '../datas/contact';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
      { id: 1, nom: 'Doe', prenom: 'John', mail: 'john.doe@gmail.com', telephone: '06.07.01.02.03', statut: 'disponible' },
      { id: 2, nom: 'Doe', prenom: 'Jack', mail: 'jack.doe@gmail.com', telephone: '06.07.04.05.06', statut: 'en réunion' },
      { id: 3, nom: 'Doe', prenom: 'Jane', mail: 'jane.doe@gmail.com', telephone: '06.07.07.08.09', statut: 'disponible' }    
    ];
    return {contacts};
  }

  genId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 11;
  }
}