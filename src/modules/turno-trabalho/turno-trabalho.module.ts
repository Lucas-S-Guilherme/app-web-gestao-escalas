import { Module } from '@nestjs/common';
import { TurnoTrabalhoController } from './turno-trabalho.controller';
import { TurnoTrabalhoService } from './turno-trabalho.service';

@Module({
  controllers: [TurnoTrabalhoController],
  providers: [TurnoTrabalhoService],
})
export class TurnoTrabalhoModule {}
