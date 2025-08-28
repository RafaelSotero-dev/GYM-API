export interface IDatabaseConnect {
  connect<T>(
    query: string,
    queryParams: Array<string | number | boolean>,
  ): Promise<T>;
}
