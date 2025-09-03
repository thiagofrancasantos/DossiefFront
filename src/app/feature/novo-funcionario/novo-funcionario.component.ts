import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FuncionariosService } from '../funcionarios.service';
import { DropdownModule } from "primeng/dropdown";
import { IFuncionario } from '../models/IFuncionario';



@Component({
  selector: 'app-novo-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule
],
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.scss'],
})
export class NovoFuncionarioComponent {
  funcionarioForm: FormGroup;
  categoriasOptions = [
    { label: 'Treinamento', value: 'Treinamento' },
    { label: 'Integração', value: 'Integracao' },
    { label: 'Histórico', value: 'Historico' },
  ];


  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private funcionariosService: FuncionariosService,
    private router: Router
  ) {
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      matricula: ['', [Validators.required, Validators.maxLength(10)]],
      telefone: ['', [Validators.required, Validators.maxLength(15)]],
      status: ['Ativo', Validators.required],
      documentos: this.fb.array([]),
    });
  }

  get documentos(): FormArray {
    return this.funcionarioForm.get('documentos') as FormArray;
  }

  addDocumento(): void {
    this.documentos.push(
      this.fb.group({
        categoria: ['', Validators.required],
        arquivo: [null, Validators.required],
      })
    );
  }

  removeDocumento(index: number): void {
    this.documentos.removeAt(index);
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name, 'for index:', index);
      this.documentos.at(index).patchValue({ arquivo: file });
    } else {
      console.log('No file selected for index:', index);
    }
  }

createFuncionario(): void {
    if (this.funcionarioForm.valid) {
      const formData = new FormData();
      formData.append('Nome', this.funcionarioForm.value.nome);
      formData.append('Matricula', this.funcionarioForm.value.matricula);
      formData.append('Telefone', this.funcionarioForm.value.telefone);
      formData.append('Status', this.funcionarioForm.value.status);
      this.funcionarioForm.value.documentos.forEach((doc: any) => {
        if (doc.arquivo && doc.categoria) {
          console.log('Appending file:', doc.arquivo.name, 'with category:', doc.categoria);
          formData.append('Arquivos', doc.arquivo);
          formData.append('Categorias', doc.categoria); // Envia como string (ex.: "Treinamento")
        }
      });

      console.log('FormData enviado:');
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      this.funcionariosService.createFuncionario(formData).subscribe({
        next: (response: { message: string; funcionario: IFuncionario }) => {
          console.log('Funcionário criado:', response.funcionario);
          this.router.navigate(['/funcionarios-ativos']);
        },
        error: (err: any) => {
          console.error('Erro ao criar funcionário:', err);
          this.errorMessage = err.error?.message || 'Não foi possível criar o funcionário.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      this.funcionarioForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/funcionarios-ativos']);
  }
}