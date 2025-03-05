import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { RequestLoggerMiddleware } from './common/middleware/resquest.logger';
//acrescentar cada novo módulo de cada entidade
import { DatabaseModule } from './database/database.module';
import { EspecializacaoModule } from './modules/especializacao/especializacao.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, UsuarioModule, EspecializacaoModule], // sempre acrescentar nova entidade que for gerada os módulos
  controllers: [AppController],
  providers: [],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*');
  }
}