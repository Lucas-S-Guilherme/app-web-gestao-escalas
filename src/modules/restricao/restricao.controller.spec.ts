import { Test, TestingModule } from '@nestjs/testing';
import { RestricaoController } from './restricao.controller';

describe('RestricaoController', () => {
  let controller: RestricaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestricaoController],
    }).compile();

    controller = module.get<RestricaoController>(RestricaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
