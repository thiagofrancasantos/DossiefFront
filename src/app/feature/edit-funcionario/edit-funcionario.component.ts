import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { FuncionariosService } from '../funcionarios.service';
import { IFuncionario } from '../models/IFuncionario';

@Component({
  selector: 'app-edit-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    MessageModule,
    DropdownModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.scss'],
})
export class EditFuncionarioComponent implements OnInit {
  funcionario?: IFuncionario;
  errorMessage: string | null = null;
  funcionarioForm: FormGroup;
  categoriasOptions = [
    { label: 'Treinamento', value: 'Treinamento' },
    { label: 'Integração', value: 'Integracao' },
    { label: 'Histórico', value: 'Historico' },
  ];

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
      documentos: this.fb.array([]),
    });
  }

  get documentos(): FormArray {
    return this.funcionarioForm.get('documentos') as FormArray;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.funcionariosService.getFuncionarioById(id).subscribe({
        next: (data) => {
          this.funcionario = {
            ...data,
            documentos: data.documentos || [],
          };
          this.errorMessage = null;
          this.funcionarioForm.patchValue({
            nome: data.nome,
            matricula: data.matricula,
            telefone: data.telefone,
            status: data.status,
          });
          this.documentos.clear();
          (data.documentos || []).forEach((doc) => {
            this.documentos.push(
              this.fb.group({
                documentoId: [doc.documentoId || null],
                categoria: [doc.categorias || '', Validators.required],
                arquivo: [null],
                nomeArquivo: [doc.nomeArquivo || ''],
                url: [doc.url || ''],
              })
            );
          });
        },
        error: () => {
          this.errorMessage = 'Não foi possível carregar os dados do funcionário.';
        },
      });
    } else {
      this.errorMessage = 'ID do funcionário inválido.';
    }
  }

  addDocumento(): void {
    this.documentos.push(
      this.fb.group({
        documentoId: [null],
        categoria: ['', Validators.required],
        arquivo: [null, Validators.required],
        nomeArquivo: [''],
        url: [''],
      })
    );
  }

  removeDocumento(index: number): void {
    this.documentos.removeAt(index);
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name, 'para o índice:', index);
      this.documentos.at(index).patchValue({
        arquivo: file,
        nomeArquivo: file.name,
      });
    } else {
      console.log('Nenhum arquivo selecionado para o índice:', index);
    }
  }

  saveFuncionario(): void {
    if (this.funcionarioForm.valid && this.funcionario) {
      const formData = new FormData();
      formData.append('Nome', this.funcionarioForm.value.nome);
      formData.append('Matricula', this.funcionarioForm.value.matricula);
      formData.append('Telefone', this.funcionarioForm.value.telefone);
      formData.append('Status', this.funcionarioForm.value.status);

      const docs = this.funcionarioForm.value.documentos;
      const documentoIds: string[] = [];
      const categorias: string[] = [];
      const arquivos: File[] = [];

      docs.forEach((doc: any) => {
        if (doc.documentoId) documentoIds.push(doc.documentoId);
        if (doc.categoria) categorias.push(doc.categoria);
        if (doc.arquivo) arquivos.push(doc.arquivo);
      });

      documentoIds.forEach((id) => formData.append('DocumentoIds', id));
      categorias.forEach((cat) => formData.append('Categorias', cat));
      arquivos.forEach((file) => formData.append('Arquivos', file));

      this.funcionariosService.updateFuncionario(this.funcionario.funcionarioId, formData).subscribe({
        next: () => {
          this.router.navigate(['/funcionarios-ativos']);
        },
        error: (err) => {
          console.error('Erro ao atualizar funcionário:', err);
          this.errorMessage = err.error?.Message || 'Não foi possível atualizar o funcionário.';
        },
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      this.funcionarioForm.markAllAsTouched();
    }
  }

  deleteFuncionario(): void {
    if (this.funcionario && confirm('Tem certeza que deseja deletar este funcionário?')) {
      this.funcionariosService.deleteFuncionario(this.funcionario.funcionarioId).subscribe({
        next: () => {
          this.router.navigate(['/funcionarios-ativos']);
        },
        error: () => {
          this.errorMessage = 'Não foi possível deletar o funcionário.';
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/funcionarios-ativos']);
  }
}