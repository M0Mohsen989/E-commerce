import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [NavbarComponent,RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
