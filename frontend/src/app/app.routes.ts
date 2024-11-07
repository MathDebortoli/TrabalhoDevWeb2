
import { Routes } from '@angular/router';

//Paginas
import { AtorComponent } from './ator/ator.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClasseComponent } from './classe/classe.component';
import { DiretorComponent } from './diretor/diretor.component';
import { ItemComponent } from './item/item.component';
import { TituloComponent } from './titulo/titulo.component';
import { SocioComponent } from './socio/socio.component';


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
  {
    path:'titulo',
    component: TituloComponent
  },

  {
    path:'item',
    component: ItemComponent
  },

  {
    path:'socio',
    component: SocioComponent
  }

];
