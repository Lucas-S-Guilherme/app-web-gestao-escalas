import { Test, TestingModule } from '@nestjs/testing';
import { RestricaoService } from './restricao.service';

describe('RestricaoService', () => {
  let service: RestricaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestricaoService],
    }).compile();

    service = module.get<RestricaoService>(RestricaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
