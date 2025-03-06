// src/modules/combatente/combatente.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CombatenteService } from './combatente.service';

describe('CombatenteService', () => {
  let service: CombatenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombatenteService],
    }).compile();

    service = module.get<CombatenteService>(CombatenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});