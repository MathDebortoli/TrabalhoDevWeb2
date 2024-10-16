import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Component, Inject, OnInit } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa o CommonModule
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <-- Corrigido aqui


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
    CommonModule,
  ],
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss',
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }

  ]
})




export class ClasseComponent {
  displayedColumns: string[] = ['id', 'data', 'valor', 'nome' , 'acoes'];
  dataSource = [] as Classe[]; // Array de classes
  private apiUrl = 'http://localhost:8080/Classe';  // URL base da sua API
  editandoId: number | null = null; // Armazena o id da classe que está sendo editada
  nomeClasse: string = '';  // Variável que armazenará o nome do input para cadastro
  dataClasse: Date = new Date();  // Variável para armazenar a data
  valorClasse: number = 0;  // Variável para armazenar o valor

  // Variáveis temporárias para edição
  nomeEditado: string = '';
  valorEditado: number = 0;
  dataEditada: Date = new Date();

  constructor(private http: HttpClient) {
    this.listarClasses();
  }




  salvarClasse() {
    const classe = { nome: this.nomeClasse, valor: this.valorClasse, data: this.dataClasse}; // Cria um objeto JSON com o nome da classe
    this.http.post(`${this.apiUrl}/Cadastrar`, classe)
      .subscribe({
        next: () => {
          console.log('Classe salva com sucesso!');
          this.nomeClasse= ''; // Limpa o input após salvar
          this.valorClasse = 0;
          this.dataClasse = new Date();
          this.listarClasses(); // Atualiza a lista de classes
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
          console.error('Erro ao listar os classes:', err);
        }
      });
  }

  deletarClasse(id: number, nome: string, data: Date, valor: number) {
    const confirmDelete = confirm(`Tem certeza que deseja deletar a classe ${nome}?`);
    const classe = { id: id, nome: nome,data: data, valor: valor };
    if (confirmDelete) {
      this.http.post(`${this.apiUrl}/Remover`,classe)
        .subscribe({
          next: () => {
            console.log(`Classe ${nome} deletado com sucesso!`);
            // Atualiza a dataSource para remover a classe da tabela
            this.listarClasses();
          },
          error: err => {
            console.error('Erro ao deletar a classe:', err);
          }
        });
    }
  }


  salvarEdicao(nomeA: string, valorA: number, dataA: Date) {
    const classe = { id: this.editandoId, nome:nomeA,valor:valorA,data:dataA}; // Aqui, `nomeA` deve ser uma string
    console.log(classe); // Isso mostrará o objeto que está sendo enviado
    this.http.post(`${this.apiUrl}/Editar`, classe)
        .subscribe({
            next: () => {
                this.listarClasses(); // Atualiza a lista de classe
                this.editandoId = null; // Reseta o id após salvar
            },
            error: err => {
                console.error('Erro ao editar o classe:', err);
            }
        });
}


  editarClasse(element: Classe) {
    this.editandoId = element.id; // Define o id da classe  que está sendo editada
    this.nomeClasse = element.nome; // Armazena o nome original
    this.dataClasse=element.data;
    this.valorClasse=element.valor;
  }

  cancelarEdicao() {
    // Restaura o nome original na lista
    const classeEditada = this.dataSource.find(classe => classe.id === this.editandoId);
    if (classeEditada) {
      classeEditada.nome = this.nomeClasse;
    }
    this.editandoId = null; // Reseta o estado de edição
    this.nomeClasse = ""; // Armazena o nome original
    this.dataClasse = new Date();
    this.valorClasse=0;
  }


}
