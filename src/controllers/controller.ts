import { IRequestBody, IRequestParams } from './request.js';

export interface IController {
  handler<T>(params: IRequestBody | IRequestParams): Promise<T | unknown>;
}
