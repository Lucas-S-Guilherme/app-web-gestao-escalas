// src/modules/especializacao/especializacao.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especializacao } from './especializacao.entity';

@Injectable()
export class EspecializacaoService {
  constructor(
    @InjectRepository(Especializacao)
    private readonly especializacaoRepository: Repository<Especializacao>,
  ) {}

  async getAll() {
    return await this.especializacaoRepository.find();
  }

  async findOneById(id: number) {
    return await this.especializacaoRepository.findOne({ where: { id_especializacao: id } });
  }

  async create(data: any) {
    const especializacao = this.especializacaoRepository.create(data);
    return await this.especializacaoRepository.save(especializacao);
  }

  async update(id: number, data: any) {
    await this.especializacaoRepository.update(id, data);
    return await this.findOneById(id);
  }

  async delete(id: number) {
    const result = await this.especializacaoRepository.delete(id);
    return result.affected > 0;
  }
}