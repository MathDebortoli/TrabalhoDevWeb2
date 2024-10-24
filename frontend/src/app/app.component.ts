import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Importe CommonModule

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
    CommonModule, // Adicione aqui se necessário
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-button [routerLink]="['/']">
        <mat-icon>home</mat-icon> Início
      </button>
      <button mat-button [routerLink]="['/ator']">
        Ator
      </button>
      <button mat-button [routerLink]="['/classe']">
        Classe
      </button>
      <button mat-button [routerLink]="['/diretor']">
        Diretor
      </button>
      <button mat-button [routerLink]="['/titulo']">
        Título
      </button>
      <button mat-button [routerLink]="['/item']">
        Item
      </button>


    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trabalho-angular';
}
