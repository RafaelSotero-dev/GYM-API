import fastify from 'fastify';
import { PostgresConnection } from './database/Postgres.js';

const app = fastify({ logger: true });

app.get('/', (_, reply) => {
  reply.send({ msg: 'Hello World!!' });
});

app.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  const teste = new PostgresConnection();

  teste.connect();
  console.log('ON');
});
