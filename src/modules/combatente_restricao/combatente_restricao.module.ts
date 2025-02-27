import { Module } from '@nestjs/common';
import { CombatenteRestricaoController } from './combatente_restricao.controller';
import { CombatenteRestricaoService } from './combatente_restricao.service';

@Module({
  controllers: [CombatenteRestricaoController],
  providers: [CombatenteRestricaoService]
})
export class CombatenteRestricaoModule {}
