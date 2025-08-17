import { databaseConfig } from '../utils/databaseConfig.js';
import type { IdatabaseConnect } from './connect.js';
import pg, { type PoolClient } from 'pg';

const { Pool } = pg;

export class PostgresConnection implements IdatabaseConnect {
  async connect(): Promise<PoolClient> {
    const pool = new Pool(databaseConfig);

    const connect = await pool.connect();

    return connect;
  }
}
