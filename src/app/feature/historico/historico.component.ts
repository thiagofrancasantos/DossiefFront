// history.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FuncionarioHistorico {
  id: number;
  nome: string;
  matricula: string;
  telefone: string;
  status: 'Ativo' | 'Inativo' | 'Suspenso';
  acao: string;
  data: Date;
  documentos?: { categoria: string; titulo: string }[];
}

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico.component.html',
})
export class HistoricoComponent {
  historico: FuncionarioHistorico[] = [
    {
      id: 1,
      nome: 'João da Silva',
      matricula: 'MAT123',
      telefone: '(11) 99999-1111',
      status: 'Ativo',
      acao: 'Funcionário criado',
      data: new Date('2025-09-01T10:30:00'),
      documentos: [
        { categoria: 'Treinamento', titulo: 'NR-35 Trabalho em Altura' },
        { categoria: 'Integração', titulo: 'Integração Segurança' },
      ],
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      matricula: 'MAT456',
      telefone: '(21) 98888-2222',
      status: 'Suspenso',
      acao: 'Funcionário editado (telefone atualizado)',
      data: new Date('2025-09-03T14:15:00'),
      documentos: [
        { categoria: 'Treinamento', titulo: 'Jabil Lean-Bronze' },
        { categoria: 'Integração', titulo: 'Certificado Conclusao Ensino Médio' },
      ],
    },
    {
      id: 3,
      nome: 'Carlos Pereira',
      matricula: 'MAT789',
      telefone: '(31) 97777-3333',
      status: 'Inativo',
      acao: 'Funcionário deletado',
      data: new Date('2025-09-05T09:00:00'),
      documentos: [
        { categoria: 'Treinamento', titulo: 'Workday Course' },
        { categoria: 'Historico', titulo: 'Conclusao Treinament Brigada' },
      ],
    },
  ];
}
