import { Titulo } from './../titulo/titulo.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export interface TituloDomain {
  nome?: string;
  id: number;
}

export interface Item {
  id?: number;
  numSerie: number;
  tituloDomain: TituloDomain;
  tipo: string;
  dataAquisicao: Date;
}

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
export class ItemComponent {
  displayedColumns: string[] = [
    'id',
    'numSerie',
    'titulo',
    'tipo',
    'data',
    'acoes',
  ];

  private apiUrl = 'http://localhost:8080/Item';
  private apiUrl2 = 'http://localhost:8080/Titulo';
  items: Item[] = [];
  titulos: Titulo[] = [];

  numSerie: number = 0;
  dataAquisicao: Date = new Date();
  selectedTituloId: number | undefined; // Novo campo para armazenar o id do título selecionado
  tipo: string = '';
  selected: string = 'fita';
  dataSource = [] as Item[];
  editandoId?: number | null = null;
  editando: boolean = false;

  loadTitles() {
    this.http.get<Item[]>(`${this.apiUrl}/Listar`).subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => {
        console.error('Erro ao listar os classes:', err);
      },
    });
  }

  loadTitulos() {
    this.http.get<Titulo[]>(`${this.apiUrl2}/Listar`).subscribe(
      (response) => {
        this.titulos = response;
        console.log('Lista de Titulos recebida:', this.titulos);
      },
      (error) => {
        console.error('Erro ao carregar os Titulos:', error);
      }
    );
  }

  loadItems() {
    this.http.get<Item[]>(`${this.apiUrl}/Listar`).subscribe(
      (response) => {
        this.items = response;
        console.log('Lista de items recebida:', this.items);
      },
      (error) => {
        console.error('Erro ao carregar os Titulos:', error);
      }
    );
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTitles();
    this.loadTitulos();
    this.loadItems();
  }

  // Função para editar um item
  editarItem(item: Item) {
    this.editando = true; // Muda para o modo de edição
    this.editandoId = item.id; // Armazena o item a ser editado
    this.numSerie = item.numSerie;
    this.selectedTituloId = item.tituloDomain.id;
    this.selected = item.tipo;
    this.dataAquisicao = item.dataAquisicao;
  }

  DeletarItem(
    id: number,
    numSerie: number,
    titulo: string,
    tipo: string,
    dataAquisicao: Date
  ) {
    const confirmDelete = confirm(
      `Tem certeza que deseja deletar o item com numSerie ${numSerie}?`
    );
    const item = {
      id: id,
      numSerie: numSerie,
      titulo: titulo,
      tipo: tipo,
      dataAquisicao: dataAquisicao,
    };

    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/Remover`, { body: item }).subscribe({
        next: () => {
          this.loadTitles();
        },
        error: (err) => {
          console.error('Erro ao deletar o item:', err);
        },
      });
    }
  }

  resetForm() {
    this.numSerie = 0;
    this.selectedTituloId = undefined;
    this.selected = '';
    this.dataAquisicao = new Date();
    this.editandoId = undefined;
  }

  salvarItem() {
    if (
      this.numSerie === 0 ||
      this.selectedTituloId === undefined ||
      this.dataAquisicao === null
    ) {
      alert('Erro no Salvamento! Verifique os campos.');
      return;
    }

    const item: Item = {
      numSerie: this.numSerie,
      tituloDomain: { id: this.selectedTituloId }, // Usando o ID do título selecionado
      tipo: this.selected, // Aqui você pode definir o tipo
      dataAquisicao: this.dataAquisicao,
    };

    this.http.post(`${this.apiUrl}/Cadastrar`, item).subscribe({
      next: () => {
        console.log('Item salvo com sucesso!');
        this.numSerie = 0; // Limpa o input após salvar
        this.selectedTituloId = undefined; // Limpa a seleção do título
        this.tipo = ''; // Limpa o input de tipo se necessário
        this.loadTitles(); // Atualiza a lista de itens
      },
      error: (err) => {
        console.error('Erro ao salvar o item:', err);
      },
    });
  }

  salvarEdicao() {
    if (this.editandoId) {
      const tituloId =
        this.selectedTituloId !== undefined ? this.selectedTituloId : 0; // ou outro valor padrão que faça sentido

      const updatedItem: Item = {
        id: this.editandoId,
        numSerie: this.numSerie,
        tituloDomain: { id: tituloId }, // Usando o ID do título selecionado
        tipo: this.selected,
        dataAquisicao: this.dataAquisicao,
      };

      this.http.put(`${this.apiUrl}/Editar`, updatedItem).subscribe({
        next: () => {
          console.log('Item atualizado com sucesso!');
          this.resetForm(); // Reseta o formulário após a atualização
          this.loadTitles(); // Atualiza a lista de itens
          this.editando = false; // Sai do modo de edição
        },
        error: (err) => {
          console.error('Erro ao atualizar o item:', err);
        },
      });
    }
  }

  cancelarEdicao(){
    this.resetForm();
    this.editando = false;
  }
}
