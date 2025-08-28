import type { IAluno } from '../entities/aluno.js';
import type { IEndereco } from '../entities/endereco.js';

interface IAlunoOutPut {
  nome: string;
  idade: string;
  email: string;
  foto: string;
  modalidade: string;
  assinatura_expira: string;
  endereco: IEndereco;
}

interface IEnderecoOutPut {
  id_endereco: string;
  rua: string;
  numero: number;
  bairro: string;
  CEP: string;
  Alunos: Array<IAluno>;
}

export interface IReply {
  data?: IAlunoOutPut | IEnderecoOutPut | { msg: string | Array<string> };
  status: number;
}
