import { Test, TestingModule } from '@nestjs/testing';
import { TurnoTrabalhoService } from './turno-trabalho.service';

describe('TurnoTrabalhoService', () => {
  let service: TurnoTrabalhoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnoTrabalhoService],
    }).compile();

    service = module.get<TurnoTrabalhoService>(TurnoTrabalhoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
