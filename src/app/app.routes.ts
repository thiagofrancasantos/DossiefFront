import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { FuncionariosAtivosComponent } from './feature/funcionarios-ativos/funcionarios-ativos.component';
import { FuncionariosInativosComponent } from './feature/funcionarios-inativos/funcionarios-inativos.component';
import { EditFuncionarioComponent } from './feature/edit-funcionario/edit-funcionario.component';
import { NovoFuncionarioComponent } from './feature/novo-funcionario/novo-funcionario.component';
import { HistoricoComponent } from './feature/historico/historico.component';
import { FuncionariosSuspensosComponent } from './feature/funcionarios-suspensos/funcionarios-suspensos.component';
import { LandingPageComponent } from './feature/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'funcionarios-ativos',
    component: FuncionariosAtivosComponent,
  },
  {
    path: 'funcionarios-inativos',
    component: FuncionariosInativosComponent,
  },
  {
    path: 'funcionarios-suspensos',
    component: FuncionariosSuspensosComponent
  },
  {
    path: 'edit-funcionario/:id',
    component: EditFuncionarioComponent,
  },
  {
    path: 'novo-funcionario',
    component: NovoFuncionarioComponent,
  },
  {
    path: 'historico',
    component: HistoricoComponent
  }
];
