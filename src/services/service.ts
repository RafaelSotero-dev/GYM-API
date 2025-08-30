import { IRequestBody, IRequestParams } from '../controllers/request.js';

export interface IService {
  validation<T>(params?: IRequestBody | IRequestParams): Promise<T | unknown>;
}
