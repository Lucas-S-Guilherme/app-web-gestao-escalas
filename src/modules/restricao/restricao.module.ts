// src/modules/restricao/restricao.module.ts
import { Module } from '@nestjs/common';
import { RestricaoController } from './restricao.controller';
import { RestricaoService } from './restricao.service';

@Module({
  controllers: [RestricaoController],
  providers: [RestricaoService],
})
export class RestricaoModule {}