import fastify from 'fastify';

const app = fastify({ logger: true });

app.get('/', (_, reply) => {
  reply.send({ msg: 'Hello World!!' });
});

app.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log('ON');
});
