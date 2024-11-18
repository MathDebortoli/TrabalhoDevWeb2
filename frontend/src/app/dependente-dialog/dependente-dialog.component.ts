import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Necessário para o two-way binding
import { MatInputModule } from '@angular/material/input'; // Para matInput
import { MatSelectModule } from '@angular/material/select'; // Para matSelect
import { MatFormFieldModule } from '@angular/material/form-field'; // Para matFormField
import { MatDatepickerModule } from '@angular/material/datepicker'; // Para mat-datepicker
import { MatNativeDateModule } from '@angular/material/core'; // Para a data

@Component({
  selector: 'app-dependente-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './dependente-dialog.component.html',
  styleUrls: ['./dependente-dialog.component.scss']
})
export class DependenteDialogComponent {

  dependente = {
    nome: '',
    sexo: '',
    dataNascimento: null
  };

  constructor(
    public dialogRef: MatDialogRef<DependenteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.dependente);
  }
}
