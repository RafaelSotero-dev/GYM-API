import {
  IRequest,
  IRequestBody,
  IRequestParams,
} from '../controllers/request.js';

export interface IService {
  validation<T>(
    params?: IRequestBody | IRequestParams | IRequest,
  ): Promise<T | unknown>;
}
