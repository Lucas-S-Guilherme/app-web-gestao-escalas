// src/modules/especializacao/especializacao.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecializacaoController } from './especializacao.controller';
import { EspecializacaoService } from './especializacao.service';
import { Especializacao } from './especializacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Especializacao])],
  controllers: [EspecializacaoController],
  providers: [EspecializacaoService],
})
export class EspecializacaoModule {}