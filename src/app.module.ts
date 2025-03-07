import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { RequestLoggerMiddleware } from './common/middleware/resquest.logger';
//acrescentar cada novo módulo de cada entidade
import { DatabaseModule } from './database/database.module';
import { EspecializacaoModule } from './modules/especializacao/especializacao.module';
import { FuncaoModule } from './modules/funcao/funcao.module';
import { RestricaoModule } from './modules/restricao/restricao.module';
import { CombatenteModule } from './modules/combatente/combatente.module';
import { RegraTrabalhoModule } from './modules/regra-trabalho/regra-trabalho.module';
import { EscalaModule } from './modules/escala/escala.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, UsuarioModule, EspecializacaoModule, FuncaoModule, RestricaoModule, CombatenteModule, RegraTrabalhoModule, EscalaModule], // sempre acrescentar nova entidade que for gerada os módulos
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