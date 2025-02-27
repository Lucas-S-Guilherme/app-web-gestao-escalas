import { Module } from '@nestjs/common';
import { RegraTrabalhoController } from './regra_trabalho.controller';
import { RegraTrabalhoService } from './regra_trabalho.service';

@Module({
  controllers: [RegraTrabalhoController],
  providers: [RegraTrabalhoService]
})
export class RegraTrabalhoModule {}
