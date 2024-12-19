import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { EscalaModule } from './modules/escala/escala.module';
import { CombatenteModule } from './modules/combatente/combatente.module';

@Module({
  imports: [UsuarioModule, EscalaModule, CombatenteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
