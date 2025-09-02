export interface IFuncionario {
  funcionarioId: string;
  nome: string;
  matricula: string;
  telefone: string;
  status: string;
  documentos?: Array<{
    documentoId: string;
    categorias: string;
    nomeArquivo: string;
    url: string;
  }>;
}