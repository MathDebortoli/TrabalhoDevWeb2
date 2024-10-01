
import { Routes } from '@angular/router';

//Paginas
import { AtorComponent } from './ator/ator.component';
import { InicioComponent } from './inicio/inicio.component';


export const routes: Routes = [
  { path: '',
    component:InicioComponent
   },

  { path: 'ator',
    component: AtorComponent
  }
];
