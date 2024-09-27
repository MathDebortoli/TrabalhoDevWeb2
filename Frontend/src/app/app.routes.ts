import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AtorComponent } from '../ator/ator.component';
import { InicioComponent } from '../inicio/inicio.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Redireciona para 'inicio' na rota vazia
  { path: 'inicio', component: InicioComponent }, // Rota para o componente inicial
  { path: 'ator', component: AtorComponent } // Rota para o componente Ator
];
