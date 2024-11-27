import { Component } from '@angular/core';

import { DatePipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Cliente, Socio } from '../cliente/cliente.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Item, MY_DATE_FORMATS } from '../item/item.component';

export interface Locacao {
  id?: number;
  item?: Item;
  cliente?: Socio;
  valorPrevisto?: number;
  devolucaoPrevista?: Date;
  pago?: boolean;
  dataLocacao?: Date;
}

@Component({
  selector: 'app-locacao',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
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
    DatePipe,
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
  itens: Item[] = [];
  socios: Socio[] = [];
  item?: Item = {};
  socio?: Socio = {};
  valorPrevisto?: number = 0;
  dataPrevista?: Date = new Date();
  apiUrl = 'http://localhost:8080';
  editandoId?: number;
  emEdicao = false;
  dataSource: Locacao[] = [];
  idItem: number | undefined;
  idCliente: number | undefined;
  locacaoEmEdicao: Locacao = {};
  displayedColumns: string[] = [
    'item',
    'cliente',
    'valorPrevisto',
    'dataPrevista',
    'dataLocacao',
    'pago',
    'acoes',
  ];

  constructor(private http: HttpClient,private datePipe: DatePipe) {
    this.lerItens();
    this.lerSocios();
    this.listarLocacoes();
  }

  onInputChange(event: any) {
    const ItemSelecionado = this.item;

    if (ItemSelecionado) {
      console.log('Título selecionado:', ItemSelecionado);

      // Verifica se a classe está presente
      const classe = ItemSelecionado;
      if (classe) {
        console.log('Classe selecionada:', classe);

        // Obtém o valor da classe
        this.valorPrevisto = ItemSelecionado.tituloDomain?.classe?.valor || 0; // Valor da classe
        console.log('Valor previsto:', this.valorPrevisto);

        // Acesse o campo correto do prazo, que é 'dataPrazo'
        const prazoClasseEmDias = Number(ItemSelecionado.tituloDomain?.classe?.dataPrazo) || 0; // Garantir que dataPrazo seja um número
        console.log('Prazo da classe (em dias):', prazoClasseEmDias);

        // Verifique se o prazo foi corretamente atribuído
        if (prazoClasseEmDias > 0) {
          // Obtém a data atual
          const dataAtual = new Date(); // Data do computador (hoje)

          // Calcula a data prevista adicionando o prazo em dias à data atual
          const dataPrevista = new Date(dataAtual);
          dataPrevista.setDate(dataAtual.getDate() + prazoClasseEmDias); // Soma o prazo em dias à data atual

          console.log('Data prevista:', dataPrevista);

          // A data prevista é a nova data calculada
          this.dataPrevista = dataPrevista;
        } else {
          console.log('Prazo inválido ou zero. A data prevista não será calculada.');
          this.dataPrevista = new Date(); // Se o prazo for 0 ou inválido, mantém a data atual
        }
      } else {
        console.log('Classe não encontrada no título selecionado.');
      }
    } else {
      console.log('Nenhum título selecionado.');
      this.valorPrevisto = 0;
      this.dataPrevista = new Date(); // Se não houver seleção, define como a data atual
    }
  }

  lerItens() {
    this.http.get<Item[]>(`${this.apiUrl}/Item/Listar`).subscribe({
      next: (data) => {
        this.itens = data;
      },
      error: (err) => {
        console.error('Erro ao listar os Items:', err);
      },
    });
  }

  lerSocios() {
    this.http.get<Socio[]>(`${this.apiUrl}/Socio/Listar`).subscribe({
      next: (data) => {
        this.socios = data;
      },
      error: (err) => {
        console.error('Erro ao listar os Socios:', err);
      },
    });
  }

  iniciarEdicaoLocacao(locacao: Locacao): void {
    this.locacaoEmEdicao = locacao; // Armazena o dependente em edição

    this.item = locacao.item;
    this.socio = locacao.cliente;
    this.valorPrevisto = locacao.valorPrevisto;
    this.dataPrevista = locacao.devolucaoPrevista;
    this.idItem = locacao.item?.id;
    this.idCliente = locacao.cliente?.id;

    this.editandoId = locacao.id; // Define o id do ator que está sendo editado
    this.emEdicao = true;
  }

  salvarEdicaoLocacao(): void {

    const locacao = {
      id: this.editandoId,
      item: this.idItem,
      cliente: this.idCliente,
      valorPrevisto: this.valorPrevisto,
      dataDevolucaoPrevista: this.dataPrevista,
    };

    console.log('Locacao a ser editada:', locacao);

    this.http.put(`${this.apiUrl}/Editar`, locacao).subscribe({
      next: () => {
        this.listarLocacoes();
      },
      error: (err) => {
        alert('Erro ao Editar a Locacao' + err);
      },
    });

    this.limparCampos(); // Restaura os campos
    this.emEdicao = false; // Sai do modo de edição sem salvar
  }

  realizarLocacao(): void {
    const formatarData = (data: Date) => {
      return data.toISOString().split('T')[0]; // Formata como 'yyyy-MM-dd'
    };

    const locacao = {
      item: this.item,
      cliente: this.socio,
      valorPrevisto: this.valorPrevisto,
      devolucaoPrevista: formatarData(this.dataPrevista ?? new Date()), // Formata a data
      pago: false,
      dataLocacao: formatarData(new Date()), // Formata a data atual
    };

    this.http.post(`${this.apiUrl}/Locacao/Cadastrar`, locacao).subscribe({
      next: () => {
        this.listarLocacoes();
        this.limparCampos();
      },
      error: (err) => {
        alert('Erro ao Adicionar a Locacao: ' + err.message);
      },
    });
  }

  removerLocacao(locacao: Locacao): void {
    const confirmDelete = confirm(
      `Tem certeza que deseja deletar a locacao do Item: ${locacao.item}?`
    );

    if(locacao.pago == true){
      alert('Item ja foi pago, não pode ser deletado!');
      return;
    }

    if (confirmDelete) {
      this.http
        .request('DELETE', 'http://localhost:8080/Locacao/Remover', {
          body: locacao,
        })
        .subscribe({
          next: () => {
            this.listarLocacoes();
          },
          error: (err) => {
            alert('Item Com Restricao de Chave Estrangeira!');
          },
        });
    }
  }

  limparCampos(): void {
    this.item = {};
    this.socio = {};
    this.valorPrevisto = 0;
    this.dataPrevista = new Date();
    this.idCliente = undefined;
    this.idItem = undefined;
  }

  cancelarEdicao(): void {
    this.limparCampos();
    this.locacaoEmEdicao = {};
    this.editandoId = undefined;
    this.emEdicao = false;
  }

  listarLocacoes(): void {
    this.http.get<Locacao[]>(`${this.apiUrl}/Locacao/Listar`).subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => {
        console.error('Erro ao listar as Locacoes:', err);
      },
    });
  }
}
