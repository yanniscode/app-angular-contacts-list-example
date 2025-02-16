import { Component } from '@angular/core';
import { ContactsComponent } from './contacts/contacts.component';

@Component({
  selector: 'app-root',
  imports: [ContactsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-angular-contacts-list-example';
}
