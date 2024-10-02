
import { Routes } from '@angular/router';

//Paginas
import { AtorComponent } from './ator/ator.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClasseComponent } from './classe/classe.component';
import { DiretorComponent } from './diretor/diretor.component';


export const routes: Routes = [
  { path: '',
    component:InicioComponent
   },

  { path: 'ator',
    component: AtorComponent
  },

  { path: 'classe',
    component: ClasseComponent
  },

  { path: 'diretor',
    component: DiretorComponent
  },
];
