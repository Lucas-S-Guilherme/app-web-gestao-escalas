import { Test, TestingModule } from '@nestjs/testing';
import { CombatenteController } from './combatente.controller';
import { CombatenteService } from './combatente.service';

describe('CombatenteController', () => {
  let controller: CombatenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombatenteController],
      providers: [CombatenteService],
    }).compile();

    controller = module.get<CombatenteController>(CombatenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
