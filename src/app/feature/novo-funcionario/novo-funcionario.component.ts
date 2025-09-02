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

@Component({
  selector: 'app-novo-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './novo-funcionario.component.html',
  styleUrl: './novo-funcionario.component.scss',
})
export class NovoFuncionarioComponent {
  funcionarioForm: FormGroup;
  categoriasOptions = [
    { label: 'Treinamento', value: 'Treinamento' },
    { label: 'Integração', value: 'Integracao' },
    { label: 'Histórico', value: 'Historico' },
  ];
  errorMessage: string | null = null;
  selectedCategoria: string | null = null;

  constructor(
    private fb: FormBuilder,
    private funcionariosService: FuncionariosService,
    private router: Router
  ) {
    console.log('categoriasOptions:', this.categoriasOptions); // Debug
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      matricula: ['', Validators.required],
      telefone: ['', Validators.required],
      status: ['', Validators.required],
      documentos: this.fb.array([]),
    });
  }

  get documentos(): FormArray {
    return this.funcionarioForm.get('documentos') as FormArray;
  }

  addDocumento(): void {
    console.log('Adding document:', this.documentos.length); // Debug
    this.documentos.push(
      this.fb.group({
        categoria: ['', Validators.required],
        arquivo: [null, Validators.required],
      })
    );
    console.log('Document added:', this.documentos.value); // Debug
  }

  removeDocumento(index: number): void {
    this.documentos.removeAt(index);
    console.log('Document removed:', this.documentos.value); // Debug
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.documentos.at(index).patchValue({ arquivo: file });
      console.log('File selected for document', index, ':', file.name); // Debug
    }
  }

  onSelectChange(event: any, index?: number): void {
    console.log('Select changed:', event.target.value, 'Index:', index); // Debug
    if (index !== undefined) {
      console.log('FormArray documentos:', this.documentos.value); // Debug
    }
  }

  createFuncionario(): void {
    console.log('Form value before submission:', this.funcionarioForm.value); // Debug
    if (this.funcionarioForm.valid) {
      const formData = new FormData();
      formData.append('Nome', this.funcionarioForm.value.nome);
      formData.append('Matricula', this.funcionarioForm.value.matricula);
      formData.append('Telefone', this.funcionarioForm.value.telefone);
      formData.append('Status', this.funcionarioForm.value.status);

      this.funcionarioForm.value.documentos.forEach(
        (doc: any, index: number) => {
          formData.append(`Arquivos[${index}]`, doc.arquivo);
          formData.append(`Categorias[${index}]`, doc.categoria);
        }
      );

      this.funcionariosService.createFuncionario(formData).subscribe({
        next: () => {
          console.log('Funcionario created successfully'); // Debug
          this.router.navigate(['/funcionarios-ativos']);
        },
        error: (err: any) => {
          console.error('Error creating funcionario:', err);
          this.errorMessage = 'Não foi possível criar o funcionário.';
        },
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      console.log('Form invalid:', this.funcionarioForm.errors); // Debug
    }
  }

  cancel(): void {
    this.router.navigate(['/funcionarios-ativos']);
  }
}
