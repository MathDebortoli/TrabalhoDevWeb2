import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MY_DATE_FORMATS } from '../classe/classe.component';
import { DependenteDialogComponent } from '../dependente-dialog/dependente-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';



export interface Cliente{
  id?: number;
  nome: string;
  endereco: string;
  telefone: number;
  sexo:string;
  cpf:string;
  dataNascimento: Date;
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
  nome?: string = '';
  rua?: string = '';
  numero?: number = 0;
  telefone?: string = '';
  sexo?: string = '';
  selected: string = 'Masculino';
  cpf: string = '';
  dataNascimento: Date = new Date();



  constructor(public dialog: MatDialog) {}

  dependentes: Array<{ nome: string; sexo: string; dataNascimento: Date }> = [];

  openDependenteDialog(): void {
    const dialogRef = this.dialog.open(DependenteDialogComponent, {
      width: '35%',
      height: '45%',
      data: { nome: '', sexo: 'Masculino', dataNascimento: new Date() },
    });

    dialogRef.afterClosed().subscribe((result: { nome: string; sexo: string; dataNascimento: Date }) => {
      if (result) {
        // Adiciona o dependente à lista
        this.dependentes.push(result);
        console.log('Dependente Adicionado', result);

        // Aqui você pode imprimir a lista completa de dependentes
        console.log('Lista de Dependentes:', this.dependentes);
      } else {
        console.log('O diálogo foi fechado sem salvar o dependente');
      }
    });
  }

  formatCPF(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    this.cpf = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})?/, (match, p1, p2, p3, p4) => {
      let formatted = `${p1}.${p2}.${p3}`;
      if (p4) {
        formatted += `-${p4}`;
      }
      return formatted;
    });

    input.value = this.cpf;
  }


  blockExcessDigits(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length >= 11 && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(event.key)) {
      event.preventDefault(); // Bloqueia a entrada de mais caracteres
    }
  }


}
