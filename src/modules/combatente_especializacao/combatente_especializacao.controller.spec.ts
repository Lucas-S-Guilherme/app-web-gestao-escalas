import { Test, TestingModule } from '@nestjs/testing';
import { CombatenteEspecializacaoController } from './combatente_especializacao.controller';

describe('CombatenteEspecializacaoController', () => {
  let controller: CombatenteEspecializacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombatenteEspecializacaoController],
    }).compile();

    controller = module.get<CombatenteEspecializacaoController>(CombatenteEspecializacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
