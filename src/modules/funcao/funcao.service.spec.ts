// src/modules/funcao/funcao.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { FuncaoController } from './funcao.controller';

describe('FuncaoController', () => {
  let controller: FuncaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncaoController],
    }).compile();

    controller = module.get<FuncaoController>(FuncaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});