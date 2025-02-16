import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Contact } from '../datas/contact';
import { ContactService } from '../services/contact.service';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'app-contacts',
  imports: [FormsModule, NgFor, MessagesComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

  contacts: Contact[] = [];
  selectedContact?: Contact;

  id: number = -1; 
  model: Contact = new Contact(this.id, "","", "", "", "");
  
  modelPrenom = "";
  modelNom = "";
  modelMail = "";
  modelTelephone = "";
  modelStatut = "";

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    console.log("ngOnInit")
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }

  onNewContact(model: Contact): void {
  // onNewContact(): void {
    // déstructuration de l'objet model car on veut que l'id soit auto-incrémentée
    let {prenom, nom, mail, telephone, statut} = model;
    // V2:
    if (!model) { return; }
    this.contactService.addContact({prenom, nom, mail, telephone, statut} as Contact)
    .subscribe(contact => { 
      this.contacts.push(contact) 
    });

    // V1: pb id incrementation:
    // this.model = new Contact(this.id++, this.modelPrenom, this.modelNom, this.modelMail, this.modelTelephone, this.modelStatut);
    // console.log(this.model);

    // if (!this.contacts || !this.model) { return; }
    // this.contactService.addContact(this.model as Contact)
    // .subscribe(contact => { 
    //   this.contacts.push(contact) 
    // });

    // on passe la liste et l'élément à ajouter
    // this.contactService.addContact(this.model);
    this.resetForm(model);
  }

  resetForm(model: Contact) {
    model.prenom = "";
    model.nom = "";
    model.mail = "";
    model.telephone = "";
    model.statut = "";
  }

  onUpdateContact(contact: Contact): void {
    this.contactService.updateContact(contact).subscribe();
  }

  onDeleteContact(contact: Contact): void {
    this.contacts = this.contacts.filter(c => c !== contact);
    this.contactService.deleteContact(contact.id).subscribe();
  }
}
