import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <-- Corrigido aqui
import { CommonModule } from '@angular/common';


export interface Diretor {
  id: number;
  nome: string;
}





@Component({
  selector: 'app-diretor',
  standalone: true,
  imports: [FormsModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,],
  templateUrl: './diretor.component.html',
  styleUrl: './diretor.component.scss'
})

export class DiretorComponent {
  private apiUrl = 'http://localhost:8080/Diretor';  // URL base da sua API
  nomeDiretor: string = '';  // Variável que armazenará o nome do input
  editandoId: number | null = null; // Armazena o id do ator que está sendo editado
  nomeOriginal: string = ''; // Armazena o nome original antes de editar
  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource = [] as Diretor[]; // Array de atores

  constructor(private http: HttpClient) {
    this.listarDiretores();

  }



  salvarDiretor() {
    if(this.nomeDiretor === '') {
      alert('O nome do diretor não pode ser vazio!');
      return;
    }

    const diretor = { nome: this.nomeDiretor }; // Cria um objeto JSON com o nome do ator
    this.http.post(`${this.apiUrl}/Cadastrar`, diretor)
      .subscribe({
        next: () => {
          console.log('Diretor salvo com sucesso!');
          this.nomeDiretor = ''; // Limpa o input após salvar
          this.listarDiretores(); // Atualiza a lista de atores
        },
        error: err => {
          console.error('Erro ao salvar o Diretor:', err);
        }
      });
  }

  salvarEdicao(nomeA: string) {
    const ator = { id: this.editandoId, nome: nomeA }; // Aqui, `nomeA` deve ser uma string
    console.log(ator); // Isso mostrará o objeto que está sendo enviado
    this.http.put(`${this.apiUrl}/Editar`, ator)
        .subscribe({
            next: () => {
                this.listarDiretores(); // Atualiza a lista de atores
                this.editandoId = null; // Reseta o id após salvar
            },
            error: err => {
                console.error('Erro ao editar o ator:', err);
            }
        });
}

  listarDiretores() {
    this.http.get<Diretor[]>(`${this.apiUrl}/Listar`)
      .subscribe({
        next: data => {
          this.dataSource = data;
        },
        error: err => {
          console.error('Erro ao listar os Diretores:', err);
        }
      });
  }

  deletarDiretor(id: number, nome: string) {
    const confirmDelete = confirm(`Tem certeza que deseja deletar o diretor ${nome}?`);
    const diretor = { id: id, nome: nome };
    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/Remover`, { body: diretor })
        .subscribe({
          next: () => {
            console.log(`Diretor${nome} deletado com sucesso!`);
            // Atualiza a dataSource para remover o ator da tabela
            this.listarDiretores();
          },
          error: err => {
            console.error('Erro ao deletar o Diretor:', err);
          }
        });
    }
  }

  editarDiretor(element: Diretor) {
    this.editandoId = element.id; // Define o id do ator que está sendo editado
    this.nomeOriginal = element.nome; // Armazena o nome original
  }

  cancelarEdicao() {
    // Restaura o nome original na lista
    const diretorEditado = this.dataSource.find(diretor => diretor.id === this.editandoId);
    if (diretorEditado) {
      diretorEditado.nome = this.nomeOriginal;
    }
    this.editandoId = null; // Reseta o estado de edição
  }

}

