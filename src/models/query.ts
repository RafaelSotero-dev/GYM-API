import type { IRequest } from '../controllers/request.js';

export interface IQuery {
  query<T>(queryParams?: IRequest): Promise<T | unknown>;
}
