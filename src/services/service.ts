import type { IRequest } from '../controllers/request.js';

export interface IService {
  validation<T>(params: IRequest): Promise<T | unknown>;
}
