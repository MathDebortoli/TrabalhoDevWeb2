import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_DATE_FORMATS } from '../item/item.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface Dependente {
    nome?: string;
    sexo?: string;
    dataNascimento?: Date | null;
    tipo?: string;
}

@Component({
  selector: 'app-dependente-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIcon,
    CommonModule,
  ],
  templateUrl: './dependente-dialog.component.html',
  styleUrls: ['./dependente-dialog.component.scss'],
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
export class DependenteDialogComponent {

  apiUrl = 'http://localhost:8080/Dependente';
  nome?: string;
  nascimento?: Date | null = null; // Inicializa com null
  sexo?: string;
  selected: string = 'Masculino';
  dependente1: Dependente = {};
  dependente2: Dependente = {};
  dependente3: Dependente = {};

  dependenteEdicao: Dependente = {}// Armazena o dependente em edição
  emEdicao = false; // Controla se estamos no modo de edição
  emEdicao1 = false; // Controla se estamos no modo de edição
  emEdicao2 = false; // Controla se estamos no modo de edição



  dependentes: Dependente[] = []; // Lista de dependentes
  dependenteSelecionados: Dependente[] = []; // Dependente selecionado

  constructor(
    public dialogRef: MatDialogRef<DependenteDialogComponent>,
    public http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { dependentes: Dependente[]; dependentesSelecionados: Dependente[] }
  ) {
    this.listarDependentes();
    this.limparCampos();
  }


  cancelar(): void {
    this.limparCampos();
    this.dialogRef.close();
  }

  salvar(): void {
    this.salvarDependente(); // Método para salvar os dados
    this.dialogRef.close(this.data); // Fecha o diálogo e retorna os dados
  }

  limparCampos(): void {
    this.nome = '';
    this.sexo = 'Masculino';
    this.nascimento = new Date();
  }

  validarCampos(): boolean {
    return this.nome !== '' && this.nascimento !== null && this.sexo !== '';
  }

  salvarDependente(): void {
    let genero;

    if(this.nome === ''){
      this.data.dependentes = this.dependentes;
      this.data.dependentesSelecionados = [this.dependente1, this.dependente2, this.dependente3].filter(dep => dep != null);      return;
    }

    if(!this.validarCampos()){
      alert('Erro no Salvamento! Campos Inválidos');
      return;
    }

    if(this.selected === "Masculino"){
      genero = 'm';
    }

    else{
      genero = 'f';
    }

    const dependente = {
      nome: this.nome,
      sexo: this.sexo === 'Masculino' ? 'm' : 'f',
      dataNascimento: this.nascimento,
      tipo: 'dependente',
    };

    this.dependenteSelecionados = [this.dependente1, this.dependente2, this.dependente3];
    this.dependentes.push(dependente);
    this.limparCampos();
  }

  listarDependentes(): void {
    if(this.data.dependentes === null){
      this.dependentes = [];
      return
    }
    if (Array.isArray(this.data.dependentes)) {
      this.dependentes = this.data.dependentes;
      this.dependente1 = this.data.dependentesSelecionados[0] || {};
      this.dependente2 = this.data.dependentesSelecionados[1] || {};
      this.dependente3 = this.data.dependentesSelecionados[2] || {};
    } else {
      console.error('Os dados recebidos não são uma lista de dependentes.');
      this.dependentes = [];
    }
  }

  excluirDep(dependente: Dependente): void {
    // Verifica se o dependente existe e o remove da lista
    this.dependentes = this.dependentes.filter(dep => dep !== dependente);

    // Reseta o dependente selecionado, se necessário
    if (this.dependente1 === dependente) {
      this.dependente1 = {};
    }
    else if (this.dependente2 === dependente) {
      this.dependente2 = {};
    }
    else if (this.dependente3 === dependente) {
      this.dependente3 = {};
    }
  }

  iniciarEdicao(dependente: Dependente, numero: number): void {
    this.dependenteEdicao = dependente; // Armazena o dependente em edição
    this.nome = dependente.nome;
    this.sexo = dependente.sexo;
    this.nascimento = dependente.dataNascimento;

    if(numero === 1){
      this.emEdicao = true; // Salva as alterações e sai do modo de edição
    }
    else if(numero === 2){
      this.emEdicao1 = true; // Salva as alterações e sai do modo de edição
    }
    else{
      this.emEdicao2 = true; // Salva as alterações e sai do modo de ed
    }
  }

  salvarEdicao(dependente: Dependente): void {
    dependente.nome = this.nome;
    dependente.sexo = this.sexo;
    dependente.dataNascimento = this.nascimento;
    this.limparCampos(); // Restaura os campos
    this.emEdicao = false; // Sai do modo de edição sem salvar
    this.emEdicao1 = false; // Salva as alterações e sai do modo de edição
    this.emEdicao2 = false; // Salva as alterações e sai do modo de edição
  }

  cancelarEdicao(): void {
    this.limparCampos(); // Restaura o valor original
    this.emEdicao = false; // Sai do modo de edição sem salvar
    this.emEdicao1 = false; // Salva as alterações e sai do modo de edição
    this.emEdicao2 = false; // Salva as alterações e sai do modo de edição
  }


}

