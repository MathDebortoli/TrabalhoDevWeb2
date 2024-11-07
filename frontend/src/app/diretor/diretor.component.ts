import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <-- Corrigido aqui
import { CommonModule } from '@angular/common';

export interface Diretor {
  id?: number;
  nome?: string;
}

@Component({
  selector: 'app-diretor',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './diretor.component.html',
  styleUrl: './diretor.component.scss',
})
export class DiretorComponent {
  private apiUrl = 'http://localhost:8080/Diretor'; // URL base da sua API
  nomeDiretor?: string = ''; // Variável que armazenará o nome do input
  editandoId?: number | null = null; // Armazena o id do ator que está sendo editado
  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource = [] as Diretor[]; // Array de atores
  editando: boolean = false; // Define o estado de edição

  constructor(private http: HttpClient) {
    this.listarDiretores();
  }

  salvarDiretor() {
    if (this.nomeDiretor === '') {
      alert('O nome do diretor não pode ser vazio!');
      return;
    }

    const diretor = { nome: this.nomeDiretor }; // Cria um objeto JSON com o nome do ator
    this.http.post(`${this.apiUrl}/Cadastrar`, diretor).subscribe({
      next: () => {
        console.log('Diretor salvo com sucesso!');
        this.nomeDiretor = ''; // Limpa o input após salvar
        this.listarDiretores(); // Atualiza a lista de atores
      },
      error: (err) => {
        console.error('Erro ao salvar o Diretor:', err);
      },
    });
  }

  listarDiretores() {
    this.http.get<Diretor[]>(`${this.apiUrl}/Listar`).subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => {
        console.error('Erro ao listar os Diretores:', err);
      },
    });
  }

  deletarDiretor(id: number, nome: string) {
    const confirmDelete = confirm(
      `Tem certeza que deseja deletar o diretor ${nome}?`
    );
    const diretor = { id: id, nome: nome };
    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/Remover`, { body: diretor }).subscribe({
        next: () => {
          console.log(`Diretor${nome} deletado com sucesso!`);
          // Atualiza a dataSource para remover o ator da tabela
          this.listarDiretores();
        },
        error: (err) => {
          alert('Erro ao deletar o diretor: ' + err);
        }
      });
    }
  }

  editarDiretor(element: Diretor) {
    this.editando = true; // Define o estado de edição
    this.editandoId = element.id; // Define o id do ator que está sendo editado
    this.nomeDiretor= element.nome; // Armazena o nome original
  }

  cancelarEdicao() {
    this.editandoId = undefined; // Reseta o id após cancelar
    this.editando = false; // Reseta o estado de edição
    this.nomeDiretor = undefined; // Armazena o nome
  }

  salvarEdicao() {
    if (this.editandoId) {
      const diretorNovo: Diretor = {
        id: this.editandoId,
        nome: this.nomeDiretor,
      };

      this.http.put(`${this.apiUrl}/Editar`, diretorNovo).subscribe({
        next: () => {
          this.listarDiretores(); // Atualiza a lista de atores
          this.editandoId = undefined; // Reseta o id após salvar
          this.editando = false; // Reseta o estado de edição
          this.nomeDiretor = undefined; // Armazena o nome original
        },
        error: (err) => {
          console.error('Erro ao editar o ator:', err);
        },
      });
    }
  }
}
