import type { IAluno } from '../entities/aluno.js';
import type { IEndereco } from '../entities/endereco.js';
import { alunoOutput } from '../services/Validations/outputSchema.js';

export interface IAlunoOutPut {
  nome: string;
  idade: string;
  email: string;
  foto: string;
  modalidade: string;
  assinatura_expira: string;
  endereco: IEndereco;
}

export interface IEnderecoOutPut {
  id_endereco: string;
  rua: string;
  numero: number;
  bairro: string;
  CEP: string;
  Alunos: Array<Omit<IAluno, 'CPF'>>;
}

export interface IReply {
  data?:
    | IEnderecoOutPut[]
    | alunoOutput
    | Array<alunoOutput>
    | []
    | { msg: string | Array<string> };
  status: number;
}
