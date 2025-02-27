import { Test, TestingModule } from '@nestjs/testing';
import { CombatenteEspecializacaoService } from './combatente_especializacao.service';

describe('CombatenteEspecializacaoService', () => {
  let service: CombatenteEspecializacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombatenteEspecializacaoService],
    }).compile();

    service = module.get<CombatenteEspecializacaoService>(CombatenteEspecializacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
