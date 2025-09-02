export type StatusFuncionario = 'Ativo' | 'Inativo' | 'Suspenso';

export interface IFuncionario {
  funcionarioId: string;
  nome: string;
  matricula: string;
  telefone: string;
  status: string;
  documentos?: {
    categoria: string;
    arquivo: string;
    nomeArquivo?: string;
    url?: string;
  }[];
}
