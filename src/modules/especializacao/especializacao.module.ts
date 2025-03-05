// src/modules/especializacao/especializacao.module.ts
import { Module } from '@nestjs/common';
import { EspecializacaoController } from './especializacao.controller';
import { EspecializacaoService } from './especializacao.service';

@Module({
  controllers: [EspecializacaoController],
  providers: [EspecializacaoService],
})
export class EspecializacaoModule {}