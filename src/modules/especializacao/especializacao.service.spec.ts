import { Test, TestingModule } from '@nestjs/testing';
import { EspecializacaoService } from './especializacao.service';

describe('EspecializacaoService', () => {
  let service: EspecializacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EspecializacaoService],
    }).compile();

    service = module.get<EspecializacaoService>(EspecializacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
