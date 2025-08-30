import {
  fastify,
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { fastifyCors } from '@fastify/cors';
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
  ZodFastifySchemaValidationError,
} from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { routes } from './routes/index.js';
import { z } from 'zod';
import { PostgresConnection } from './database/PostgresConnection.js';

export type FastifyTypedInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;

z.config(z.locales.pt());

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: 'http://localhost:3000' });

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Academia API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.setErrorHandler((err, _, reply) => {
  const status = err.statusCode as number;

  if (err.code === 'FST_ERR_CTP_INVALID_JSON_BODY') {
    return reply
      .status(400)
      .send({ data: { msg: 'FORMATO DA REQUISIÇÃO INVALIDA!' } });
  }
  if (err.code === 'FST_ERR_VALIDATION') {
    const validation = err.validation as ZodFastifySchemaValidationError[];
    let code: number = 500;
    const errArr = validation.map((error, ind) => {
      if (error.keyword === 'invalid_format') {
        code = 400;
        return `Error #${ind + 1}: Code: ${code} ~ Message: ${error.message} `;
      }
      if (error.keyword !== 'invalid_format') {
        code = 422;
        return `Error #${ind + 1}: Code: ${code} ~ Message: ${error.message} `;
      }
    });
    return reply.status(status).send({ data: { msg: errArr } });
  }
});

app.register(routes);

app.listen({ port: 3000 }, (err, address) => {
  const database = new PostgresConnection();
  const res = database.connect('SELECT 1;', []);
  res.catch(() => {
    process.exit(1);
  });

  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listenig at ${address}`);
});
