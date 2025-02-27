import { Test, TestingModule } from '@nestjs/testing';
import { CombatenteRestricaoController } from './combatente_restricao.controller';

describe('CombatenteRestricaoController', () => {
  let controller: CombatenteRestricaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombatenteRestricaoController],
    }).compile();

    controller = module.get<CombatenteRestricaoController>(CombatenteRestricaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
