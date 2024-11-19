import { Item } from './../item/item.component';
import { locacao, LocacaoComponent } from './../locacao/locacao.component';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface Devolucao{
  id?: number;
  dataDevolucao?: Date;
  valorMulta?: number;
  locacao?:locacao | null;
  item?:Item | null;

}

@Component({
  selector: 'app-devolucao',
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
  templateUrl: './devolucao.component.html',
  styleUrl: './devolucao.component.scss'
})
export class DevolucaoComponent {
  locacaos: locacao[] = [];
  items: Item[] = [];


}
