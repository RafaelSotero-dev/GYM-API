type envType = {
  USER: string;
  PASSWORD: string;
  HOST: string;
  PORT: string;
  DATABASE: string;
};

const env = process.env as envType;

export const databaseConfig = {
  user: env.USER,
  password: env.PASSWORD,
  host: env.HOST,
  port: Number(env.PORT),
  database: env.DATABASE,
};
