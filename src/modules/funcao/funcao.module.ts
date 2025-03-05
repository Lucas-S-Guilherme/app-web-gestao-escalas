// src/modules/funcao/funcao.module.ts
import { Module } from '@nestjs/common';
import { FuncaoController } from './funcao.controller';
import { FuncaoService } from './funcao.service';

@Module({
  controllers: [FuncaoController],
  providers: [FuncaoService],
})
export class FuncaoModule {}