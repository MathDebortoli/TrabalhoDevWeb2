import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
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
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MY_DATE_FORMATS } from '../classe/classe.component';
import { DependenteDialogComponent } from '../dependente-dialog/dependente-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { stringify } from 'node:querystring';

export interface Cliente {
  id?: number;
  nome: string;
  rua: string;
  telefone: number;
  sexo: string;
  cpf: string;
  dataNascimento: Date;
  tipo: string;
}

export interface Socio {
  id?: number;
  nome?: string;
  rua?: string;
  numero?: number;
  telefone?: string;
  sexo?: string;
  cpf?: string;
  dataNascimento?: Date;
  dependentes?: Dependente[];
  tipo?: string;
}

export interface Dependente {
  nome: string;
  sexo: string;
  dataNascimento: Date;
  tipo?: string;
}

@Component({
  selector: 'app-socio',
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
    CommonModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
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
export class SocioComponent {
  id?: number;
  nome?: string = '';
  rua?: string = '';
  numero?: number = 0;
  telefone?: string = '';
  sexo?: string = '';
  selected: string = 'Masculino';
  cpf?: string = '';
  dataNascimento?: Date = new Date();
  displayedColumns: string[] = [
    'id',
    'nome',
    'numero',
    'rua',
    'telefone',
    'sexo',
    'cpf',
    'nascimento',
    'dependente',
    'acoes',
  ];
  dataSource: Cliente[] = [];
  dependentes?: Dependente[] = [];
  dependentesSelecionados?: Dependente[] = [];
  apiUrl = 'http://localhost:8080/Socio';
  emEdicao = false;
  socioEmEdicao: Socio = {};
  editandoId: number | undefined;

  constructor(public dialog: MatDialog, public http: HttpClient) {
    this.listarSocios();
  }

  openDependenteDialog(): void {
    const dialogRef = this.dialog.open(DependenteDialogComponent, {
      width: '45%',
      height: '45%',
      data: {
        dependentes: this.dependentes, // Primeiro vetor
        dependentesSelecionados: this.dependentesSelecionados, // Segundo vetor
      },
    });

    dialogRef.afterClosed().subscribe(
      (
        result: {
          dependentes: Dependente[];
          dependentesSelecionados: Dependente[];
        } | null
      ) => {
        if (result) {
          this.dependentes = result.dependentes; // Atualiza o primeiro vetor
          this.dependentesSelecionados = result.dependentesSelecionados; // Atualiza o segundo vetor
        } else {
          console.log('Diálogo cancelado ou sem alterações.');
        }
      }
    );
  }

  formatarDependentes(
    dependentes: { nome: string }[] | null | undefined
  ): string {
    if (!dependentes || dependentes.length === 0) {
      return '';
    }
    return dependentes
      .filter((dep) => dep != null && dep.nome) // Filtra dependentes válidos com nome
      .map((dep) => dep.nome) // Extrai o nome de cada dependente
      .join(', '); // Junta os nomes em uma string separada por vírgula
  }

  formatCPF(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    this.cpf = value.replace(
      /(\d{3})(\d{3})(\d{3})(\d{1,2})?/,
      (match, p1, p2, p3, p4) => {
        let formatted = `${p1}.${p2}.${p3}`;
        if (p4) {
          formatted += `-${p4}`;
        }
        return formatted;
      }
    );

    input.value = this.cpf;
  }

  blockExcessDigits(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (
      value.length >= 11 &&
      !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(event.key)
    ) {
      event.preventDefault(); // Bloqueia a entrada de mais caracteres
    }
  }

  removerSocio(socio: Cliente): void {
    if (confirm('Tem certeza que deseja remover este sócio?')) {
      this.http.delete(`${this.apiUrl}/Remover`, { body: socio }).subscribe({
        next: () => {
          console.log(`Sócio: ${socio.nome} deletado com sucesso!`);
          // Atualiza a dataSource para remover o ator da tabela
          this.listarSocios();
        },
        error: (err) => {
          alert('Erro ao deletar o socio!: ' + err);
        },
      });
    }
  }

  cadastrarSocio(): void {
    let genero;

    if (this.validarCampos()) {
      alert('Erro no Salvamento! Verifique os campos.');
      return;
    }

    if (this.selected === 'Masculino') {
      genero = 'm';
    } else {
      genero = 'f';
    }

    this.dependentesSelecionados = this.dependentesSelecionados?.filter(
      (dep) => dep.nome && dep.sexo && dep.dataNascimento
    );

    const socio = {
      id: this.id,
      nome: this.nome,
      rua: this.rua,
      numero: this.numero,
      telefone: this.telefone,
      sexo: genero,
      cpf: this.cpf,
      dataNascimento: this.dataNascimento,
      dependentes: this.dependentesSelecionados,
      tipo: 'socio',
    };

    this.http.post(`${this.apiUrl}/Cadastrar`, socio).subscribe({
      next: () => {
        this.limparCampos();
        this.listarSocios();
      },
      error: (err) => {
        alert('Erro ao salvar o Socio' + err);
      },
    });
  }

  listarSocios() {
    this.http.get<Cliente[]>(`${this.apiUrl}/Listar`).subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => {
        console.error('Erro ao listar os classes:', err);
      },
    });
  }

  validarCampos() {
    return (
      this.nome === '' ||
      this.rua === '' ||
      this.numero === 0 ||
      this.telefone === '' ||
      this.cpf === '' ||
      this.dataNascimento === null
    );
  }

  limparCampos() {
    this.nome = '';
    this.rua = '';
    this.numero = 0;
    this.telefone = '';
    this.cpf = '';
    this.dataNascimento = new Date();
    this.dependentes = [];
    this.dependentesSelecionados = [];
    this.id = undefined;
    this.editandoId = undefined; // Reseta o id após salvar
  }

  iniciarEdicao(socio: Socio): void {
    this.socioEmEdicao = socio; // Armazena o dependente em edição

    this.id = socio.id;
    this.nome = socio.nome;
    this.rua = socio.rua;
    this.numero = socio.numero;
    this.telefone = socio.telefone;
    this.cpf = socio.cpf;
    this.dataNascimento = socio.dataNascimento;
    this.selected = socio.sexo === 'm' ? 'Masculino' : 'Feminino';
    this.dependentesSelecionados = socio.dependentes;
    this.dependentes = socio.dependentes;

    this.editandoId = socio.id; // Define o id do ator que está sendo editado
    this.emEdicao = true;
  }

  salvarEdicao(): void {
    // Filtra os dependentes nulos e adiciona o tipo 'dependente'
    // Filtra os dependentes nulos ou incompletos e adiciona o tipo 'dependente'
    const dependentesFiltrados =
      this.dependentesSelecionados
        ?.filter(
          (dependente) =>
            dependente != null &&
            dependente.nome &&
            dependente.sexo &&
            dependente.dataNascimento
        )
        .map((dependente) => {
          dependente.tipo = 'dependente'; // Modifica o dependente
          return dependente; // Retorna o dependente modificado
        }) || []; // Garante que a variável não seja nula, caso dependentesSelecionados seja undefined

    // Agora cria o objeto socio com a lista de dependentes já filtrados e modificados
    const socio = {
      id: this.id,
      nome: this.nome,
      rua: this.rua,
      numero: this.numero,
      telefone: this.telefone,
      sexo: this.selected === 'Masculino' ? 'm' : 'f',
      cpf: this.cpf,
      dataNascimento: this.dataNascimento,
      dependentes: dependentesFiltrados, // Utiliza a lista de dependentes modificada
      tipo: 'socio',
    };

    //alert('Socio:' + JSON.stringify(socio));

    this.http.put(`${this.apiUrl}/Editar`, socio).subscribe({
      next: () => {
        this.listarSocios();
      },
      error: (err) => {
        alert('Erro ao Editar o Socio' + err);
      },
    });
    this.dependentes = undefined;
    this.limparCampos(); // Restaura os campos
    this.emEdicao = false; // Sai do modo de edição sem salvar
  }

  cancelarEdicao(): void {
    this.limparCampos(); // Restaura o valor original
    this.socioEmEdicao = {};
    this.emEdicao = false; // Sai do modo de edição sem salvar
  }
}
