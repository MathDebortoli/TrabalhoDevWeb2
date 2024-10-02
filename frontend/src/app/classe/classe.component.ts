import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

export interface PeriodicElement {
  name: string;
  position: number;
  data: string;
  valor: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, data:"31/04/2012", valor:18, name: 'Hydrogen'},
  { position: 2, data:"11/04/2002", valor:42, name: 'Helium'},
  { position: 3, data:"10/12/2012", valor:12, name: 'Lithium'},
  { position: 4, data:"04/02/2012", valor:20, name: 'Beryllium'},
];

@Component({
  selector: 'app-classe',
  standalone: true,
  imports: [
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss',
})

export class ClasseComponent {
  displayedColumns: string[] = ['position', 'data', 'valor', 'name' , 'action'];
  dataSource = ELEMENT_DATA;
}
