import { Test, TestingModule } from '@nestjs/testing';
import { CombatenteRestricaoService } from './combatente_restricao.service';

describe('CombatenteRestricaoService', () => {
  let service: CombatenteRestricaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombatenteRestricaoService],
    }).compile();

    service = module.get<CombatenteRestricaoService>(CombatenteRestricaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
