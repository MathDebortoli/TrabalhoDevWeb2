import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <-- Corrigido aqui

export interface Classe {
  id: number;
  nome: string;
  data: Date;
  valor: number;
}

@Component({
  selector: 'app-classe',
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
  ],
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss',
})

export class ClasseComponent {
  displayedColumns: string[] = ['id', 'data', 'valor', 'nome' , 'acoes'];
  dataSource = [] as Classe[]; // Array de atores
  private apiUrl = 'http://localhost:8080/Classe';  // URL base da sua API
  nomeClasse: string = '';  // Variável que armazenará o nome do input
  dataClasse: Date = new Date();
  valorClasse: string = '';

  constructor(private http: HttpClient) {
    this.listarClasses();
  }

  salvarClasse() {
    const classe = { nome: this.nomeClasse, valor: this.valorClasse, data: this.dataClasse}; // Cria um objeto JSON com o nome do ator
    this.http.post(`${this.apiUrl}/Cadastrar`, classe)
      .subscribe({
        next: () => {
          console.log('Classe salva com sucesso!');
          this.nomeClasse= ''; // Limpa o input após salvar
          this.valorClasse = '';
          this.dataClasse = new Date();
          this.listarClasses(); // Atualiza a lista de atores
        },
        error: err => {
          console.error('Erro ao salvar o Classe:', err);
        }
      });
  }

  listarClasses() {
    this.http.get<Classe[]>(`${this.apiUrl}/Listar`)
      .subscribe({
        next: data => {
          this.dataSource = data;
        },
        error: err => {
          console.error('Erro ao listar os atores:', err);
        }
      });
  }
}
