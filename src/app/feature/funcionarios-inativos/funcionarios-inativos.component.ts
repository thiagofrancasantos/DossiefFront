import { Component } from '@angular/core';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { FuncionariosService } from '../funcionarios.service';
import { IFuncionario } from '../models/IFuncionario';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funcionarios-inativos',
  standalone: true,
  imports: [
    TableModule,
    CommonModule
  ],
  templateUrl: './funcionarios-inativos.component.html',
  styleUrl: './funcionarios-inativos.component.scss'
})
export class FuncionariosInativosComponent {

  funcionariosInativos$?: Observable<IFuncionario[]>;

  constructor(private funcionarioService: FuncionariosService) {}
  
  ngOnInit(): void {
    this.funcionariosInativos$ = this.funcionarioService.getFuncionariosInativos();
  }
}
