export type StatusFuncionario = 'Ativo' | 'Inativo' | 'Suspenso';

export interface IRegistrarFuncionario {
  nome: string;
  matricula: string;
  telefone: string;
  status: StatusFuncionario;
  documentos: { categoria: string; arquivo: File | null }[];
}