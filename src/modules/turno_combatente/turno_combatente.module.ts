import { Module } from '@nestjs/common';
import { TurnoCombatenteController } from './turno_combatente.controller';
import { TurnoCombatenteService } from './turno_combatente.service';

@Module({
  controllers: [TurnoCombatenteController],
  providers: [TurnoCombatenteService]
})
export class TurnoCombatenteModule {}
