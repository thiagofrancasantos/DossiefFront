import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) {    
  }

  navegarFuncionariosAtivos(){
    console.log("NavegarFuncionariosAtivos Funcionando");
    this.router.navigate(['/funcionarios-ativos']);
  }

  navegarFuncionariosInativos(){
    console.log("NavegarFuncionariosInativos Funcionando");
    this.router.navigate(['/funcionarios-inativos']);
  }
  navegarFuncionariosSuspensos(){
    console.log("NavegarFuncionariosSuspensos Funcionando");
    this.router.navigate(['/funcionarios-suspensos'])
  }
}
