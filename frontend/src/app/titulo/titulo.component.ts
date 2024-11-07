import { DatePipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Ator } from '../ator/ator.component';
import { Classe } from '../classe/classe.component';
import { Diretor } from '../diretor/diretor.component';

export interface Titulo {
  id: number | null;
  nome: string;
  atores: Ator[] | null;
  diretor: Diretor | null;
  ano: number;
  sinopse: string;
  categoria: string;
  classe: Classe | null;
}

@Component({
  selector: 'app-titulo',
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
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.scss',
})
export class TituloComponent {
  diretores: Diretor[] = []; // Changed from 'classe' to 'classes'
  classes: Classe[] = []; // Changed from 'classe' to 'classes'
  atoresList: Ator[] = [];
  displayedColumns: string[] = [
    'id',
    'atores',
    'nome',
    'ano',
    'diretor',
    'categoria',
    'classe',
    'sinopse',
    'acoes',
  ];
  ano: number = 0;
  atores: Ator[] = [];
  sinopse: string = '';
  nome: string = '';
  titulos: Titulo[] = [];
  categoria: string = 'f';
  actores = new FormControl<Ator[]>([]); // FormControl que armazena os atores selecionados
  diretor: number | undefined; // Item selecionado na lista de diretores
  classeItem: number | undefined; // Item selecionado na lista de classes

  isEditing: boolean = false; // Indica se estamos em modo de edição
  editandoId: number | null = null; // ID do título que está sendo editado

  editarItem(titulo: Titulo) {
    this.isEditing = true; // Muda para o modo de edição
    this.editandoId = titulo.id; // Define o título que está sendo editado
    this.nome = titulo.nome; // Preenche os campos com os valores do título
    this.ano = titulo.ano;
    this.sinopse = titulo.sinopse;
    this.categoria = titulo.categoria;
    this.diretor = titulo.diretor?.id;
    this.classeItem = titulo.classe?.id;
    this.actores.setValue(titulo.atores); // Preenche a lista de atores
  }

  salvarEdicao() {
    if (this.editandoId) {
      const tituloAtualizado: Titulo = {
        id: this.editandoId,
        nome: this.nome,
        ano: this.ano,
        sinopse: this.sinopse,
        categoria: this.categoria,
        diretor: { id: this.diretor},
        classe: {id: this.classeItem},
        atores: this.actores.value,
      };

      // A chamada PUT estava errada, removi uma chave extra
      this.http
        .put(
          `http://localhost:8080/Titulo/Editar`,
          tituloAtualizado
        )
        .subscribe({
          next: () => {
            this.lerTitulos(); // Atualiza a lista de títulos
            this.cancelarEdicao(); // Cancela o modo de edição
            alert('Título atualizado com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar o Titulo:', err);
          },
        });
    }
  }

  compareAtores(a1: Ator, a2: Ator): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }

  cancelarEdicao() {
    this.isEditing = false; // Volta ao modo normal
    this.editandoId = null; // Limpa o ID do título em edição
    this.limparCampos(); // Limpa os campos
  }

  getCategoriaNome(categoria: string): string {
    switch (categoria) {
      case 'f':
        return 'Faroeste';
      case 't':
        return 'Terror';
      case 'c':
        return 'Comédia';
      default:
        return categoria;
    }
  }

  getAtoresNomes(atores: Ator[]): string {
    return atores.map((ator) => ator.nome).join(', ');
  }

  constructor(private http: HttpClient) {
    this.lerAtores();
    this.lerClasses();
    this.lerDiretor();
    this.lerTitulos();
  }

  deletarItem(id: number) {
    const confirmDelete = confirm(
      `Tem certeza que deseja deletar o Titulo com Id: ${id}?`
    );
    if (confirmDelete) {
      const item = { id: id };
      this.http
        .request('DELETE', 'http://localhost:8080/Titulo/Remover', {
          body: item,
        })
        .subscribe({
          next: () => {
            this.lerTitulos();
          },
          error: (err) => {
            alert('Titulo Com Restricao de Chave Estrangeira!');
          },
        });
    }
  }

  lerTitulos() {
    this.http
      .get<Titulo[]>('http://localhost:8080/Titulo/Listar')
      .subscribe((data) => {
        this.titulos = data; // Assign to 'titulos' property
      });
  }

  validarCampos() {
    if (
      this.ano == 0 ||
      this.actores.value?.length == 0 ||
      this.sinopse == '' ||
      this.nome == '' ||
      this.diretor == null ||
      this.classeItem == null
    ) {
      alert('Preencha Todos os Campos!');
      return;
    }
    this.inserirTitulo();
  }

  inserirTitulo() {
    let titulo: Titulo = {
      id: null,
      nome: this.nome,
      atores: this.actores.value, // Deve ser uma lista de objetos Ator
      diretor: {id: this.diretor}, // Deve ser um objeto Diretor
      ano: this.ano,
      sinopse: this.sinopse,
      categoria: this.categoria,
      classe: {id: this.classeItem}, // Deve ser um objeto Classe
    };

    this.http
      .post('http://localhost:8080/Titulo/Cadastrar', titulo)
      .subscribe((data) => {
        this.lerTitulos(); // Função para recarregar a lista (caso exista)
        this.limparCampos(); // Chame a função de limpar os campos após a inserção
        alert('Título inserido com sucesso!');
      }); // Função para inserir o item no banco de dados,
    error: (err: any) => {
      console.error('Erro ao atualizar o item:', err);
    };
  }

  limparCampos() {
    this.ano = 0;
    this.actores.setValue([]); // Limpa os atores selecionados
    this.sinopse = '';
    this.nome = '';
    this.categoria = 'f';
    this.diretor = undefined;
    this.classeItem = undefined;
  }

  lerAtores() {
    this.http
      .get<Ator[]>('http://localhost:8080/Ator/Listar')
      .subscribe((data) => {
        this.atoresList = data;
      });
  }

  lerClasses() {
    this.http
      .get<Classe[]>('http://localhost:8080/Classe/Listar')
      .subscribe((data) => {
        this.classes = data; // Assign to 'classes' property
      });
  }

  lerDiretor() {
    this.http
      .get<Diretor[]>('http://localhost:8080/Diretor/Listar')
      .subscribe((data) => {
        this.diretores = data; // Assign to 'classes' property
      });
  }
}
