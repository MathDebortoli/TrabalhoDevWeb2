
import { Routes } from '@angular/router';




import { AtorComponent } from './ator/ator.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClasseComponent } from './classe/classe.component';
import { DiretorComponent } from './diretor/diretor.component';
import { ItemComponent } from './item/item.component';
import { TituloComponent } from './titulo/titulo.component';
import { SocioComponent } from './cliente/cliente.component';
import { LocacaoComponent } from './locacao/locacao.component';
import { DevolucaoComponent } from './devolucao/devolucao.component';


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
  },

  {
    path:'locacao',
    component:LocacaoComponent
  },
  
  {
    path:'devolucao',
    component:DevolucaoComponent
  }

];
