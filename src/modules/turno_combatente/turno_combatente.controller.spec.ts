import { Test, TestingModule } from '@nestjs/testing';
import { TurnoCombatenteController } from './turno_combatente.controller';

describe('TurnoCombatenteController', () => {
  let controller: TurnoCombatenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurnoCombatenteController],
    }).compile();

    controller = module.get<TurnoCombatenteController>(TurnoCombatenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
