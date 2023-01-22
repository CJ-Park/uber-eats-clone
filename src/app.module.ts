import { ApolloDriver } from '@nestjs/apollo';
import { ApolloDriverConfig } from '@nestjs/apollo/dist/interfaces';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { ExampleModule } from './example/example.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Restaurant } from './example/entities/restaurant.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",
      ignoreEnvFile: process.env.NODE_ENV === "prod",
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== "prod",
      logging: true,
      entities: [Restaurant]
    }),
    ExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
