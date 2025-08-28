import type { IRequest } from './request.js';

export interface IController {
  handler<T>(params: IRequest): Promise<T | unknown>;
}
