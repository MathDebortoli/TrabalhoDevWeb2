import { DatePipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


export interface Titulo {
  nome: string;
  atores: string;
  diretor: string;
  ano: number;
  sinopse: string;
  categoria: string;
  classe: string;
}
@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    DatePipe,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.scss'

})



export class TituloComponent {
  ano: number = 0;
  nome: string = '';
  atores: string = '';
  diretor: string = '';
  sinopse: string = '';
  categoria: string = '';
  classe: string = '';
  selected = '';


  titulos: Titulo[] = [
    { nome: 'O Poderoso Chefão', atores: 'Marlon Brando, Al Pacino, James Caan', diretor: 'Francis Ford Coppola', ano: 1972, sinopse: 'A história', categoria: 'Drama', classe: 'A' },
    { nome: 'O Poderoso Chefão II', atores: 'Al Pacino, Robert De Niro, Robert Duvall', diretor: 'Matt Murdock', ano: 1974, sinopse: 'A história', categoria: 'Drama', classe: 'B' },
    { nome: 'O Poderoso Chefão III', atores: 'Al Pacino, Diane Keaton, Andy Garcia', diretor: ' Cassius Clay', ano: 1990, sinopse: 'A história', categoria: 'Drama', classe: 'C' },


  ];

}
