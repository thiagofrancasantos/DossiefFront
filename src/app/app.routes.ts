import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { FuncionariosAtivosComponent } from './feature/funcionarios-ativos/funcionarios-ativos.component';
import { FuncionariosInativosComponent } from './feature/funcionarios-inativos/funcionarios-inativos.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'funcionarios-ativos',
        component: FuncionariosAtivosComponent
    },
    {
        path: 'funcionarios-inativos',
        component: FuncionariosInativosComponent
    }
];
