import { Module } from '@nestjs/common';
import { CombatenteService } from './combatente.service';
import { CombatenteController } from './combatente.controller';

@Module({
  controllers: [CombatenteController],
  providers: [CombatenteService],
})
export class CombatenteModule {}
