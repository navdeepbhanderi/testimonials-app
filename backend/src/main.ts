import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  app.use(session({
    secret: configService.get<string>('SESSION_SECRET'),
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 86400000,
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  const port = configService.get<number>('APP_PORT')
  await app.listen(port);
}
bootstrap();
