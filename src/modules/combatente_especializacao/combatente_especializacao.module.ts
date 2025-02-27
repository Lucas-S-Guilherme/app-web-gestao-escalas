import { Module } from '@nestjs/common';
import { CombatenteEspecializacaoController } from './combatente_especializacao.controller';
import { CombatenteEspecializacaoService } from './combatente_especializacao.service';

@Module({
  controllers: [CombatenteEspecializacaoController],
  providers: [CombatenteEspecializacaoService]
})
export class CombatenteEspecializacaoModule {}
