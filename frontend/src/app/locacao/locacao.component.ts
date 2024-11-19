import { Component } from '@angular/core';

import { DatePipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';


import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Titulo } from '../titulo/titulo.component';
import { Cliente} from '../cliente/cliente.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_DATE_FORMATS } from '../item/item.component';




export interface locacao{
  id?: number;
  titulo: Titulo |null,
  cliente: Cliente |null,
  valorPrevisto: number | null,
  devolucaoPrevista: Date | null,



}


@Component({
  selector: 'app-locacao',
  standalone: true,
  imports: [MatButtonModule,FormsModule,ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './locacao.component.html',
  styleUrl: './locacao.component.scss',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})


export class LocacaoComponent {
  titulos: Titulo[]=[];
  clientes: Cliente[]=[];
  valorPrevisto: number = 0;
  dataPrevista: Date = new Date();


}
