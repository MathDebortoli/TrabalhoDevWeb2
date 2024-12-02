import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select'; // Importar MatSelectModule
import { Titulo } from '../titulo/titulo.component';
import { Ator } from '../ator/ator.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  nome: string = '';
  tipos: string[] = ['Por Categoria', 'Por Ator'];
  tipoSelecionado: string = 'Por Ator'; // Armazena o valor selecionado
  valor: string = '';
  titulos: Titulo[] = [];
  nomefiltro: string = '';
  titulosFiltrados: Titulo[] = [];
  apiUrl: string = 'http://localhost:8080/Titulo';
  displayedColumns: string[] = [
    'id',
    'nome',
    'ano',
    'categoria',
    'classe',
    'diretor',
    'atores',
    'sinopse',
  ];
  constructor(private http: HttpClient) {}

  buscar(): void {
    if (this.tipoSelecionado === 'Por Ator') {
      this.buscarPorAtor();
    } else {
      this.buscarPorCategoria();
    }
  }

  buscarPorAtor(): void {

    this.http
      .get<Titulo[]>(`${this.apiUrl}/Listar/Ator/${this.valor}`)
      .subscribe({
        next: (data) => {
          this.titulos = data;
        },
        error: (err) => {
          console.error('Erro ao listar os títulos por Ator:', err);
        },
      });
  }

  ngOnInput(event: any): void {
    const filtro = this.nomefiltro.toLowerCase(); // Valor digitado no campo de filtro

    this.titulosFiltrados = this.titulos;
    // Filtra os títulos com base no nome
    const titulosFiltrados: Titulo[] = this.titulos.filter((titulo) =>
      titulo.nome?.toLowerCase().includes(filtro)
    );

    // Atualiza o dataSource da tabela com os objetos filtrados
    this.titulos = titulosFiltrados;
  }



  buscarPorCategoria(): void {
    let tipo;
    if (this.valor.toUpperCase() === 'FAROESTE') {
      tipo = "f";
    }
    if (this.valor.toUpperCase() === 'TERROR') {
      tipo = "t";
    }
    if (this.valor.toUpperCase() === 'COMÉDIA') {
      tipo = "c";
    }
    this.http
      .get<Titulo[]>(`${this.apiUrl}/Listar/Categoria/${tipo}`)
      .subscribe({
        next: (data) => {
          this.titulos = data;
        },
        error: (err) => {
          console.error('Erro ao listar os títulos por Categoria:', err);
        },
      });
  }

  compareAtores(a1: Ator, a2: Ator): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
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
}
