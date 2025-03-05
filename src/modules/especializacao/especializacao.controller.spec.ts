// src/modules/especializacao/especializacao.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { EspecializacaoController } from './especializacao.controller';

describe('EspecializacaoController', () => {
  let controller: EspecializacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspecializacaoController],
    }).compile();

    controller = module.get<EspecializacaoController>(EspecializacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});