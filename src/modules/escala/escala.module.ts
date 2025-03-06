import { Module } from '@nestjs/common';
import { EscalaController } from './escala.controller';
import { EscalaService } from './escala.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioService } from '../usuario/usuario.service';

@Module({
  imports: [UsuarioModule],
  controllers: [EscalaController],
  providers: [EscalaService, UsuarioService],
})
export class EscalaModule {}