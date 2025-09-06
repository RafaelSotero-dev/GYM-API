import type {
  IRequest,
  IRequestBody,
  IRequestParams,
} from '../controllers/request.js';

export interface IQuery {
  query<T>(
    queryParams?: IRequestBody | IRequestParams | IRequest,
  ): Promise<T | unknown>;
}
