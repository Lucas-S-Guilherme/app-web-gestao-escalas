// src/modules/regra-trabalho/regra-trabalho.module.ts
import { Module } from '@nestjs/common';
import { RegraTrabalhoController } from './regra-trabalho.controller';
import { RegraTrabalhoService } from './regra-trabalho.service';

@Module({
    controllers: [RegraTrabalhoController],
    providers: [RegraTrabalhoService],
})
export class RegraTrabalhoModule {}