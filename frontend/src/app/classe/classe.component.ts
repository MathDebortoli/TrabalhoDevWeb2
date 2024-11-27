import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa o CommonModule
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <-- Corrigido aqui

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Definindo o formato para input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Definindo o formato de exibição
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface Classe {
  id?: number;
  nome?: string;
  dataPrazo?: number;  // Prazo é um número
  valor?: number;
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
export class ClasseComponent {
  displayedColumns: string[] = ['id', 'prazo', 'valor', 'nome', 'acoes'];
  dataSource = [] as Classe[]; // Array de classes
  private apiUrl = 'http://localhost:8080/Classe'; // URL base da sua API
  editandoId?: number | null = null; // Armazena o id da classe que está sendo editada
  nomeClasse?: string = ''; // Variável que armazenará o nome do input para cadastro
  prazoClasse?: number = 0; // Variável para armazenar o prazo
  valorClasse?: number = 0; // Variável para armazenar o valor
  editando: boolean = false; // Variável para controlar o estado de edição

  // Variáveis temporárias para edição
  nomeEditado: string = '';
  valorEditado: number = 0;
  prazoEditado: number = 0;

  constructor(private http: HttpClient) {
    this.listarClasses();
  }

  salvarClasse() {
    if (this.nomeClasse === '' || this.valorClasse === 0 || this.prazoClasse === 0) {
      alert('Erro no Salvamento!');
      return;
    }

    const classe = {
      nome: this.nomeClasse,
      valor: this.valorClasse,
      dataPrazo: this.prazoClasse, // Aqui deve ser dataPrazo, não prazo
    };

    console.log('Classe a ser salva:', classe);
    this.http.post(`${this.apiUrl}/Cadastrar`, classe).subscribe({
      next: () => {
        console.log('Classe salva com sucesso!');
        this.nomeClasse = ''; // Limpa o input após salvar
        this.valorClasse = 0;
        this.prazoClasse = 0;
        this.listarClasses(); // Atualiza a lista de classes
      },
      error: (err) => {
        console.error('Erro ao salvar a Classe:', err);
      },
    });
  }


  listarClasses() {
    this.http.get<Classe[]>(`${this.apiUrl}/Listar`).subscribe({
      next: (data) => {
        this.dataSource = data;
        console.log('Dados recebidos:', this.dataSource);  // Adicione este log para verificar os dados
      },
      error: (err) => {
        console.error('Erro ao listar as classes:', err);
      },
    });
  }


  deletarClasse(id: number, nome: string, prazo: number, valor: number) {
    const confirmDelete = confirm(
      `Tem certeza que deseja deletar a classe ${nome}?`
    );
    const classe = { id: id, nome: nome, dataPrazo: prazo, valor: valor };
    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/Remover`, { body: classe }).subscribe({
        next: () => {
          console.log(`Classe ${nome} deletado com sucesso!`);
          // Atualiza a dataSource para remover a classe da tabela
          this.listarClasses();
        },
        error: (err) => {
          console.error('Erro ao deletar a classe:', err);
        },
      });
    }
  }

  salvarEdicao() {
    if (this.editandoId) {
      const classe: Classe = {
        id: this.editandoId,
        nome: this.nomeClasse,
        dataPrazo: this.prazoClasse,
        valor: this.valorClasse,
      };

      this.http.put(`${this.apiUrl}/Editar`, classe).subscribe({
        next: () => {
          this.listarClasses(); // Atualiza a lista de classe
          this.cancelarEdicao(); // Cancela o modo de edição
        },
        error: (err) => {
          console.error('Erro ao editar o Classe!', err);
        },
      });
    }
  }

  editarClasse(element: Classe) {
    this.editando = true; // Muda para o modo de edição
    this.editandoId = element.id; // Define o id da classe que está sendo editada
    this.nomeClasse = element.nome; // Armazena o nome original
    this.prazoClasse = element.dataPrazo; // Garantindo que prazo seja tratado como número
    this.valorClasse = element.valor;
  }

  cancelarEdicao() {
    this.editandoId = null; // Reseta o estado de edição
    this.nomeClasse = ''; // Armazena o nome original
    this.prazoClasse = 0;
    this.valorClasse = 0;
    this.editando = false; // Reseta o estado de edição
  }
}
