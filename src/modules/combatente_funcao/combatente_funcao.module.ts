import { Module } from '@nestjs/common';
import { CombatenteFuncaoController } from './combatente_funcao.controller';
import { CombatenteFuncaoService } from './combatente_funcao.service';

@Module({
  controllers: [CombatenteFuncaoController],
  providers: [CombatenteFuncaoService]
})
export class CombatenteFuncaoModule {}
