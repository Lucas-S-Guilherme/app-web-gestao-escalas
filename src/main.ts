import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import * as passport from 'passport';
import { join } from 'path';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';
import { flashErrors } from './common/helpers/flash-errors';
import { hbsRegisterHelpers } from './common/helpers/hbs-functions';
import flash = require('connect-flash');
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  hbsRegisterHelpers(hbs);
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '/views/layouts'));
  app.useStaticAssets(join(__dirname, '..', '/public')); //configura o servidor para servir arquivos estáticos a partir do diretório public, o caminho deve ser relativo a esse diretório, no main.hbs por exemploo
  app.setBaseViewsDir(join(__dirname, '/views'));
  hbs.registerPartials(join(__dirname, '/views/layouts/partials'));
  app.setViewEngine('hbs');

  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use(flashErrors);
  app.useGlobalFilters(new NotFoundExceptionFilter());

  // Configura o middleware para parsear o corpo das requisições
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  await app.listen(3000);
}

bootstrap();
