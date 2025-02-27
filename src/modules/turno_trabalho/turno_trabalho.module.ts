import { Module } from '@nestjs/common';
import { TurnoTrabalhoController } from './turno_trabalho.controller';
import { TurnoTrabalhoService } from './turno_trabalho.service';

@Module({
  controllers: [TurnoTrabalhoController],
  providers: [TurnoTrabalhoService]
})
export class TurnoTrabalhoModule {}
