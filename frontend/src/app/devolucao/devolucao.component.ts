import { Item } from './../item/item.component';
import { Locacao, LocacaoComponent } from './../locacao/locacao.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface Devolucao {
  id?: number;
  dataDevolucao?: Date;
  valorMulta?: number;
  locacao?: Locacao | null;
  item?: Item | null;
}

@Component({
  selector: 'app-devolucao',
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
    MatDatepickerModule,
  ],
  providers: [DatePipe],
  templateUrl: './devolucao.component.html',
  styleUrls: ['./devolucao.component.scss'],
})
export class DevolucaoComponent {
  itemObj: number | undefined;
  locacaoObj: number | undefined;
  apiUrl = 'http://localhost:8080/Devolucao';
  multa: number = 0;
  valorAPagar: number = 0; // Propriedade para exibir o valor total a ser pago

  locacaos: Locacao[] = []; // Agora usando a classe locacao

  items: Item[] = [];

  constructor(private http: HttpClient) {
    this.lerItens();
    this.lerLocacoes(); // Carrega as locações usando a classe locacao
  }

  // Função para carregar itens
  lerItens() {
    this.http.get<Item[]>('http://localhost:8080/Item/Listar').subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Erro ao buscar itens:', err);
      },
    });
  }

  // Função para carregar locações
  lerLocacoes() {
    this.http.get<Locacao[]>('http://localhost:8080/Locacao/Listar').subscribe({
      next: (data) => {
        this.locacaos = data;
      },
      error: (err) => {
        console.error('Erro ao buscar locações:', err);
      },
    });
  }

 // Função para calcular o valor total com base na locação
 calcularValorTotal(locacao: Locacao): number {
  if (!locacao) {
    console.error('Locação inválida.');
    return 0;
  }

  let total = 0;
  const dataAtual = new Date();
  let dataDevolucaoPrevista = locacao.devolucaoPrevista; // Mantendo o nome correto

  // Definindo o valor da multa por atraso diretamente
  const multaPorDia = 5; // Exemplo: 5 reais por dia de atraso

  // Convertendo a dataDevolucaoPrevista para Date, se necessário
  if (typeof dataDevolucaoPrevista === 'string') {
    dataDevolucaoPrevista = new Date(dataDevolucaoPrevista);
  }

  // Zerando a hora, minuto, segundo e milissegundo das datas para comparação correta
  const dataAtualZerada = new Date(dataAtual.setHours(0, 0, 0, 0));
  const dataDevolucaoPrevistaZerada = dataDevolucaoPrevista ? new Date(dataDevolucaoPrevista.setHours(0, 0, 0, 0)) : null;

  console.log('Data atual (sem hora):', dataAtualZerada);
  console.log('Data de devolução prevista (sem hora):', dataDevolucaoPrevistaZerada);

  // Cálculo de multa por atraso
  if (dataDevolucaoPrevistaZerada && dataAtualZerada > dataDevolucaoPrevistaZerada) {
    const diasAtraso = Math.ceil(
      (dataAtualZerada.getTime() - dataDevolucaoPrevistaZerada.getTime()) / (1000 * 60 * 60 * 24)
    );
    console.log('Dias de atraso:', diasAtraso);

    const multa = diasAtraso * multaPorDia;
    console.log('Multa por atraso:', multa);

    total += multa; // Adicionando a multa ao total
  } else {
    console.log('Não há atraso ou data de devolução inválida.');
  }

  // Verificar se o valor está pago
  if (locacao.pago === false && locacao.valorPrevisto != null) {
    console.log('Valor previsto a ser pago:', locacao.valorPrevisto);
    total += locacao.valorPrevisto;
  } else if (locacao.pago === null || locacao.pago === undefined) {
    console.warn('O status de pagamento não foi informado para esta locação.');
  }

  console.log('Total calculado:', total);

  return total;
}

// Função para atualizar o valor total ao selecionar uma locação
atualizarValorAPagar() {
  const locacaoSelecionada = this.locacaos.find(
    (locacao) => locacao.id === this.locacaoObj
  );

  if (locacaoSelecionada) {
    console.log('Locação selecionada:', locacaoSelecionada);
    this.valorAPagar = this.calcularValorTotal(locacaoSelecionada);
  } else {
    console.log('Nenhuma locação encontrada.');
    this.valorAPagar = 0;
  }

  console.log('Valor a pagar atualizado:', this.valorAPagar);
}
efetuarDevolucao() {
  // Verifique se a locação foi selecionada
  const locacaoSelecionada = this.locacaos.find(
    (locacao) => locacao.id === this.locacaoObj
  );

  if (!locacaoSelecionada) {
    console.error('Locação não selecionada ou inválida!');
    return;
  }

  // Faça a requisição HTTP para marcar a locação como paga
  this.http.put(`http://localhost:8080/Locacao/EfetuarDevolucao`, locacaoSelecionada.id).subscribe({
    next: (response) => {
      console.log('Devolução efetuada com sucesso!', response);
      // Exiba mensagem de sucesso para o usuário
      alert('Devolução realizada com sucesso!');
      // Atualize o valor a pagar
      this.valorAPagar = 0; // Zere o valor a pagar após a devolução
      this.lerLocacoes(); // Recarregue as locações
    },
    error: (err) => {
      console.error('Erro ao efetuar devolução:', err);
      // Exiba mensagem de erro para o usuário
      alert('Ocorreu um erro ao realizar a devolução. Tente novamente.');
    },
  });
}

}
