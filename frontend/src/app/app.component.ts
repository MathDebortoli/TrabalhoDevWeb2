import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,

  ],

  template:`
  <mat-toolbar color="primary">
  <button mat-button [routerLink]="['/']">
    <mat-icon>home</mat-icon> Início
  </button>
  <button mat-button [routerLink]="['/ator']">
    Ator
  </button>
  <button mat-button>
    Classe
  </button>
  <button mat-button>
    Diretor
  </button>
</mat-toolbar>
    <router-outlet></router-outlet>
    
`,
  styleUrls: ['./app.component.scss']

}


)
export class AppComponent {
  title = 'trabalho-angular';
}
