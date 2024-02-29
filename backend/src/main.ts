import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { resolvers } from '@generated/type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';

async function bootstrap() {
  const prisma = new PrismaClient();
  const schema = await buildSchema({
    resolvers: resolvers,
    emitSchemaFile: {
      path: 'graphql/schema.gql',
    },
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  await startStandaloneServer(apolloServer, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    context: () => ({ prisma }),
    listen: { port: 4000 },
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors();

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
