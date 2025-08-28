import { alunoInput } from '../services/Validations/inputSchema.js';

export interface IRequest {
  body: alunoInput;
  params?: string;
  query?: string;
  headers?: string;
}
