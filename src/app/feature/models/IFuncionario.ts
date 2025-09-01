export type StatusFuncionario = 'Ativo' | 'Inativo' | 'Suspenso';

export interface IFuncionario {
    id: string;
    nome: string;
    matricula: string;
    telefone: string;
    status: StatusFuncionario;
}