import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FuncionariosService } from '../funcionarios.service';
import { IFuncionario } from '../models/IFuncionario';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from "../../core/components/navbar/navbar.component";

@Component({
  selector: 'app-funcionarios-ativos',
  standalone: true,
  imports: [
    TableModule,
    AutoCompleteModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    NavbarComponent
],
  templateUrl: './funcionarios-ativos.component.html',
  styleUrl: './funcionarios-ativos.component.scss',
})
export class FuncionariosAtivosComponent implements OnInit {
  items: IFuncionario[] = [];
  selectedItems: IFuncionario[] = [];
  allFuncionarios: IFuncionario[] = [];
  filteredFuncionarios: IFuncionario[] = [];
  funcionariosAtivos$?: Observable<IFuncionario[]>;

  constructor(
    private funcionariosAtivosService: FuncionariosService,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter(
          (event: RouterEvent): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/funcionarios-ativos') {
          this.loadFuncionarios();
        }
      });
  }

  ngOnInit(): void {
    this.loadFuncionarios();
  }

  loadFuncionarios(): void {
    this.funcionariosAtivosService.getFuncionariosAtivos().subscribe({
      next: (data) => {
        this.allFuncionarios = data;
        this.filteredFuncionarios = [...data];
      },
      error: (err) => {
        console.error('Error fetching funcionarios:', err);
      },
    });
  }

  search(event: any): void {
    const query = event.query ? event.query.toLowerCase() : '';
    this.items = this.allFuncionarios.filter((func) =>
      func.nome.toLowerCase().includes(query)
    );
    this.filteredFuncionarios = this.items;
  }

  editFuncionario(funcionarioId: string): void {
    console.log('Navigating to edit-funcionario with id:', funcionarioId);
    this.router.navigate(['/edit-funcionario', funcionarioId]);
  }
}
