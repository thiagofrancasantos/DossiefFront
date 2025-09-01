import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FuncionariosService } from '../funcionarios.service';
import { IFuncionario } from '../models/IFuncionario';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funcionarios-ativos',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    AutoCompleteModule,
    FormsModule
  ],
  templateUrl: './funcionarios-ativos.component.html',
  styleUrl: './funcionarios-ativos.component.scss'
})

export class FuncionariosAtivosComponent {
  
  items: IFuncionario[] = [];
  selectedItems: IFuncionario[] = []; // Funcionários selecionados no autocomplete
  allFuncionarios: IFuncionario[] = []; // Lista completa (usada para autocomplete)
  filteredFuncionarios: IFuncionario[] = []; // Lista que será exibida na tabela

  
  funcionariosAtivos$?: Observable<IFuncionario[]>;

  constructor(private funcionariosAtivosService: FuncionariosService){}

  ngOnInit(): void {
    this.funcionariosAtivosService.getFuncionariosAtivos().subscribe(data => {
      this.allFuncionarios = data;
      this.filteredFuncionarios = data; // Mostra todos por padrão
    });
  }

  search(event: any) {
    const query = event.query.toLowerCase();
    this.items = this.allFuncionarios.filter(func =>
      func.nome.toLowerCase().includes(query)
    );
  }

  onSelectionChange() {
    if (this.selectedItems.length > 0) {
      this.filteredFuncionarios = this.selectedItems;
    } else {
     this.filteredFuncionarios = this.allFuncionarios;
    }
  }

}
