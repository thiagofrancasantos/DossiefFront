import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FuncionariosService } from '../funcionarios.service';
import { IFuncionario } from '../models/IFuncionario';

@Component({
  selector: 'app-edit-funcionario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './edit-funcionario.component.html',
  styleUrl: './edit-funcionario.component.scss',
})
export class EditFuncionarioComponent implements OnInit {
  funcionario?: IFuncionario;
  errorMessage: string | null = null;
  funcionarioForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private funcionariosService: FuncionariosService,
    private fb: FormBuilder
  ) {
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      matricula: ['', Validators.required],
      telefone: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.funcionariosService.getFuncionarioById(id).subscribe({
        next: (data) => {
          this.funcionario = {
            ...data,
            documentos: data.documentos || [], // Ensure documentos is an array
          };
          this.errorMessage = null;
          this.funcionarioForm.patchValue({
            nome: data.nome,
            matricula: data.matricula,
            telefone: data.telefone,
            status: data.status,
          });
        },
        error: (err: any) => {
          console.error('Error fetching funcionario:', err);
          this.errorMessage =
            'Não foi possível carregar os dados do funcionário.';
        },
      });
    } else {
      this.errorMessage = 'ID do funcionário inválido.';
    }
  }

  saveFuncionario(): void {
    if (this.funcionarioForm.valid && this.funcionario) {
      const updatedFuncionario: IFuncionario = {
        ...this.funcionario,
        ...this.funcionarioForm.value,
      };
      this.funcionariosService
        .updateFuncionario(this.funcionario.funcionarioId, updatedFuncionario)
        .subscribe({
          next: () => {
            this.router.navigate(['/funcionarios-ativos']);
          },
          error: (err: any) => {
            console.error('Error updating funcionario:', err);
            this.errorMessage = 'Não foi possível atualizar o funcionário.';
          },
        });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
    }
  }

  deleteFuncionario(): void {
    if (
      this.funcionario &&
      confirm('Tem certeza que deseja deletar este funcionário?')
    ) {
      this.funcionariosService
        .deleteFuncionario(this.funcionario.funcionarioId)
        .subscribe({
          next: () => {
            this.router.navigate(['/funcionarios-ativos']);
          },
          error: (err: any) => {
            console.error('Error deleting funcionario:', err);
            this.errorMessage = 'Não foi possível deletar o funcionário.';
          },
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/funcionarios-ativos']);
  }
}
