import { Test, TestingModule } from '@nestjs/testing';
import { RegraTrabalhoService } from './regra-trabalho.service';

describe('RegraTrabalhoService', () => {
  let service: RegraTrabalhoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegraTrabalhoService],
    }).compile();

    service = module.get<RegraTrabalhoService>(RegraTrabalhoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
