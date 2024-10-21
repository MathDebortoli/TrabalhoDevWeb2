import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <-- Corrigido aqui
import { CommonModule } from '@angular/common'; // <-- Importe aqui o CommonModule

export interface Ator {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-ator',
  standalone: true,
  templateUrl: './ator.component.html',
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
  styleUrls: ['./ator.component.scss'],
})

export class AtorComponent {
  private apiUrl = 'http://localhost:8080/Ator';  // URL base da sua API
  nomeAtor: string = '';  // Variável que armazenará o nome do input
  editandoId: number | null = null; // Armazena o id do ator que está sendo editado
  nomeOriginal: string = ''; // Armazena o nome original antes de editar
  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource = [] as Ator[]; // Array de atores

  constructor(private http: HttpClient) {
    this.listarAtores();
  }

  salvarAtor() {
    if(this.nomeAtor === '') {
      alert('O nome do ator não pode ser vazio!');
      return;
    }
    const ator = { nome: this.nomeAtor }; // Cria um objeto JSON com o nome do ator
    this.http.post(`${this.apiUrl}/Cadastrar`, ator)
      .subscribe({
        next: () => {
          console.log('Ator salvo com sucesso!');
          this.nomeAtor = ''; // Limpa o input após salvar
          this.listarAtores(); // Atualiza a lista de atores
        },
        error: err => {
          console.error('Erro ao salvar o ator:', err);
        }
      });
  }

  listarAtores() {
    this.http.get<Ator[]>(`${this.apiUrl}/Listar`)
      .subscribe({
        next: data => {
          this.dataSource = data;
        },
        error: err => {
          console.error('Erro ao listar os atores:', err);
        }
      });
  }

  salvarEdicao(nomeA: string) {
    const ator = { id: this.editandoId, nome: nomeA }; // Aqui, `nomeA` deve ser uma string
    console.log(ator); // Isso mostrará o objeto que está sendo enviado
    this.http.put(`${this.apiUrl}/Editar`, ator)
        .subscribe({
            next: () => {
                this.listarAtores(); // Atualiza a lista de atores
                this.editandoId = null; // Reseta o id após salvar
            },
            error: err => {
                console.error('Erro ao editar o ator:', err);
            }
        });
}


  deletarAtor(id: number, nome: string) {
    const confirmDelete = confirm(`Tem certeza que deseja deletar o ator ${nome}?`);
    const ator = { id: id, nome: nome };
    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/Remover`, { body: ator })
        .subscribe({
          next: () => {
            console.log(`Ator ${nome} deletado com sucesso!`);
            // Atualiza a dataSource para remover o ator da tabela
            this.listarAtores();
          },
          error: err => {
            console.error('Erro ao deletar o ator:', err);
          }
        });
    }
  }

  editarAtor(element: Ator) {
    this.editandoId = element.id; // Define o id do ator que está sendo editado
    this.nomeOriginal = element.nome; // Armazena o nome original
  }

  cancelarEdicao() {
    // Restaura o nome original na lista
    const atorEditado = this.dataSource.find(ator => ator.id === this.editandoId);
    if (atorEditado) {
      atorEditado.nome = this.nomeOriginal;
    }
    this.editandoId = null; // Reseta o estado de edição
  }

}
