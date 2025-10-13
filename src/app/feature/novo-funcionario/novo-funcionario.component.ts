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
  { label: 'Integracao', value: 'Integracao' },
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
  const documentoControl = this.documentos.at(index);
  if (file) {
    console.log(`File selected: ${file.name} for index: ${index}`);
    documentoControl.get('arquivo')?.setValue(file);
    documentoControl.get('arquivo')?.markAsTouched();
    documentoControl.get('arquivo')?.updateValueAndValidity();
  } else {
    console.warn(`Nenhum arquivo selecionado no índice ${index}`);
    documentoControl.get('arquivo')?.setValue(null);
    documentoControl.get('arquivo')?.markAsTouched();
    documentoControl.get('arquivo')?.updateValueAndValidity();
  }
  console.log(`Estado do documento ${index}:`, documentoControl.value);
}

  createFuncionario(): void {
  if (this.funcionarioForm.invalid) {
    this.funcionarioForm.markAllAsTouched();
    console.log('Formulário inválido:', this.funcionarioForm.errors);
    console.log('Estado do FormArray documentos:', this.documentos.controls.map(c => c.value));
    this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
    return;
  }

  const formData = new FormData();
  formData.append('Nome', this.funcionarioForm.get('nome')?.value);
  formData.append('Matricula', this.funcionarioForm.get('matricula')?.value);
  formData.append('Telefone', this.funcionarioForm.get('telefone')?.value);
  formData.append('Status', this.funcionarioForm.get('status')?.value);

  // Adicionar documentos
  let documentosValidos = true;
  this.documentos.controls.forEach((doc, index) => {
    const categoria = doc.get('categoria')?.value;
    const arquivo = doc.get('arquivo')?.value;

    if (categoria && arquivo) {
      console.log(`Appending file: ${arquivo.name} with category: ${categoria} at index: ${index}`);
      formData.append('Arquivos', arquivo);
      formData.append('Categorias', categoria); 
    } else {
      console.warn(`Documento inválido no índice ${index}: categoria=${categoria}, arquivo=${arquivo ? arquivo.name : 'null'}`);
      documentosValidos = false;
    }
  });

  if (!documentosValidos && this.documentos.length > 0) {
    console.error('Um ou mais documentos estão incompletos. Verifique os campos categoria e arquivo.');
    this.errorMessage = 'Todos os documentos devem ter categoria e arquivo preenchidos.';
    return;
  }

 
  console.log('FormData enviado:');
  for (const pair of (formData as any).entries()) {
    console.log(`${pair[0]}: ${pair[1]?.name || pair[1]}`);
  }

  this.funcionariosService.createFuncionario(formData).subscribe({
    next: (response) => {
      console.log('Funcionário criado com sucesso:', response);
      this.funcionarioForm.reset();
      this.documentos.clear();
      this.errorMessage = null;
    },
    error: (error) => {
      console.error('Erro ao criar funcionário:', error);
      this.errorMessage = error.error?.message || 'Erro ao criar funcionário';
      console.log('Detalhes do erro:', error.error);
    },
  });
}

  cancel(): void {
    this.router.navigate(['/funcionarios-ativos']);
  }
}