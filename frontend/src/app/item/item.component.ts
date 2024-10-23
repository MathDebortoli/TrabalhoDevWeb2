import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MomentDateAdapter } from '@angular/material-moment-adapter';



export interface Item {

  numSerie: number;
  dataAquisicao: Date;
  titulo: string;
  tipo:string;

}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',  // Definindo o formato para input
  },
  display: {
    dateInput: 'DD/MM/YYYY',  // Definindo o formato de exibição
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-item',
  standalone: true,
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
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
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }

  ],
})

export class ItemComponent {
  numSerie: number = 0;
  dataAquisicao: Date = new Date();
  titulo: string = '';
  selected = '';

  items: Item[] = [
    { numSerie: 1, dataAquisicao: new Date(), titulo: 'Steak' ,tipo:'Comida'},
    { numSerie: 2, dataAquisicao: new Date(), titulo: 'Pizza',tipo:'Comida' },
    { numSerie: 3, dataAquisicao: new Date(), titulo: 'Tacos',tipo:'Comida' },
  ];
}


