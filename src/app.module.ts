import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [AuthModule, UsersModule, UsuarioModule], // sempre acrescentar nova entidade que for gerada os módulos
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
