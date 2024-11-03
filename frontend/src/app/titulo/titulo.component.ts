import { DatePipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


export interface Titulo {
  id:string;
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
    ReactiveFormsModule,
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
  actores = new FormControl('');
  atoresList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  titulos: Titulo[] = [
    


  ];

}
