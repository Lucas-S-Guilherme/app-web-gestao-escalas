// src/modules/combatente/combatente.module.ts
import { Module } from '@nestjs/common';
import { CombatenteController } from './combatente.controller';
import { CombatenteService } from './combatente.service';

@Module({
  controllers: [CombatenteController],
  providers: [CombatenteService],
})
export class CombatenteModule {}