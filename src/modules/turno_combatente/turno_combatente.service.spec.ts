import { Test, TestingModule } from '@nestjs/testing';
import { TurnoCombatenteService } from './turno_combatente.service';

describe('TurnoCombatenteService', () => {
  let service: TurnoCombatenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnoCombatenteService],
    }).compile();

    service = module.get<TurnoCombatenteService>(TurnoCombatenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
