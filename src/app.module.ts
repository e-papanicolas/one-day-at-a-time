import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { EntryModule } from './modules/entry/entry.module';
import { NoteModule } from './modules/note/note.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { PrismaService } from './providers/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { GqlAuthGuard } from './modules/auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
// import * as Joi from 'joi';

@Module({
  imports: [
    UserModule,
    EntryModule,
    NoteModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
      // validationSchema: Joi.object({
      //   PORT: Joi.number().default(8082),
      //   DATABASE_URL: Joi.string().required(),
      //   JWT_SECRET: Joi.string().required(),
      // }),
      // validationOptions: {
      //   allowUnknown: false,
      //   abortEarly: true,
      // },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    AuthService,
    JwtService,
    {
      provide: 'APP_GUARD',
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {}
