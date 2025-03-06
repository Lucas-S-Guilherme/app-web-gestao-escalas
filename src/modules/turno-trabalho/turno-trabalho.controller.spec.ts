import { Test, TestingModule } from '@nestjs/testing';
import { TurnoTrabalhoController } from './turno-trabalho.controller';

describe('TurnoTrabalhoController', () => {
  let controller: TurnoTrabalhoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurnoTrabalhoController],
    }).compile();

    controller = module.get<TurnoTrabalhoController>(TurnoTrabalhoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
