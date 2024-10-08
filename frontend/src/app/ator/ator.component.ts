import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079 },
  { position: 2, name: 'Helium', weight: 4.0026 },
  { position: 3, name: 'Lithium', weight: 6.941 },
  { position: 4, name: 'Beryllium', weight: 9.0122 },
];

@Component({
  selector: 'app-ator',
  standalone: true,
  templateUrl: './ator.component.html',
  imports: [FormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule],
  styleUrls: ['./ator.component.scss'],
})
export class AtorComponent {
  private apiUrl = 'http://localhost:8080/Ator';  // URL base da sua API
  nomeAtor: string = '';  // Variável que armazenará o nome do input

  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;

  constructor(private http: HttpClient) {}

  salvarAtor(name: string): Observable<any> {
    console.log("Salvando ator:", name);
    return this.http.post(`${this.apiUrl}/${name}`, {});  // Passa o nome na URL
  }
}
