import { Test, TestingModule } from '@nestjs/testing';
import { CombatenteController } from './combatente.controller';

describe('CombatenteController', () => {
  let controller: CombatenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombatenteController],
    }).compile();

    controller = module.get<CombatenteController>(CombatenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
