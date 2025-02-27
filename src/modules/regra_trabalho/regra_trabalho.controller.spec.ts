import { Test, TestingModule } from '@nestjs/testing';
import { RegraTrabalhoController } from './regra_trabalho.controller';

describe('RegraTrabalhoController', () => {
  let controller: RegraTrabalhoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegraTrabalhoController],
    }).compile();

    controller = module.get<RegraTrabalhoController>(RegraTrabalhoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
