import { databaseConfig } from '../infra/databaseConfig.js';
import type { IDatabaseConnect } from './db.js';
import pg from 'pg';

const { Client } = pg;

export class PostgresConnection implements IDatabaseConnect {
  async connect<T>(
    queryString: string,
    queryParams: Array<string | number | boolean>,
  ): Promise<T> {
    const client = new Client(databaseConfig);
    try {
      await client.connect();

      const result = await client.query(queryString, queryParams);

      return result as T;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await client.end();
    }
  }
}
