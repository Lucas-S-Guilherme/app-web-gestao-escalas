import { Test, TestingModule } from '@nestjs/testing';
import { CombatenteFuncaoController } from './combatente_funcao.controller';

describe('CombatenteFuncaoController', () => {
  let controller: CombatenteFuncaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombatenteFuncaoController],
    }).compile();

    controller = module.get<CombatenteFuncaoController>(CombatenteFuncaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
