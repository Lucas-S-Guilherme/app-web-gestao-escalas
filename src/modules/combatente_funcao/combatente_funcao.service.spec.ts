import { Test, TestingModule } from '@nestjs/testing';
import { CombatenteFuncaoService } from './combatente_funcao.service';

describe('CombatenteFuncaoService', () => {
  let service: CombatenteFuncaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombatenteFuncaoService],
    }).compile();

    service = module.get<CombatenteFuncaoService>(CombatenteFuncaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
