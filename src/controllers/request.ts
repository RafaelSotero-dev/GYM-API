import { alunoInput } from '../services/Validations/inputSchema.js';

export interface IRequestParams {
  cpf: string;
}
export interface IRequestBody {
  body: alunoInput;
}

export interface IRequest {
  params: { cpf: string };
  body: alunoInput;
}
