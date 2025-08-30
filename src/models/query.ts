import type { IRequestBody, IRequestParams } from '../controllers/request.js';

export interface IQuery {
  query<T>(queryParams?: IRequestBody | IRequestParams): Promise<T | unknown>;
}
