export interface IdatabaseConnect {
  connect<T>(): Promise<T> | unknown;
}
