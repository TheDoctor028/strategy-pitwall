import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { resolvers } from '@generated/type-graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'express';

async function bootstrap() {
  const prisma = new PrismaClient();
  const schema = await buildSchema({
    resolvers: resolvers,
    emitSchemaFile: {
      path: 'graphql/schema.gql',
    },
    validate: false,
  });

  const apolloServer = new ApolloServer<{ prisma: PrismaClient }>({
    schema,
  });

  const app = await NestFactory.create(AppModule);

  const CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };

  await apolloServer.start();

  app.enableCors(CorsOptions);

  app.use(
    '/graphql',
    json(),
    expressMiddleware<{ prisma: PrismaClient }>(apolloServer, {
      context: async () => ({ prisma }),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NESTJS API')
    .setDescription('REST API for NESTJS')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
