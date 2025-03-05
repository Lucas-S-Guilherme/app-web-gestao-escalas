// src/modules/especializacao/especializacao.service.ts
import { Injectable } from '@nestjs/common';
import { Especializacao } from './especializacao.entity';

@Injectable()
export class EspecializacaoService {
  async getAll() {
    try {
      console.log('[DEBUG] Buscando especializações no banco...');
      const especializacoes = await Especializacao.find();
      console.log('[DEBUG] Especializações encontradas:', JSON.stringify(especializacoes, null, 2));
      return especializacoes;
    } catch (error) {
      console.error('[ERRO CRÍTICO] Falha na busca:', error.stack);
      throw new Error('Erro interno ao carregar especializações');
    }
  }

  async create(data: any) {
    const especializacao = Especializacao.create({ ...data });
    return await especializacao.save();
  }

  async update(id: number, data: any) {
    const especializacao = await Especializacao.findOneBy({ id_especializacao: id });
    if (!especializacao) {
      return false;
    }

    Object.assign(especializacao, data);
    await especializacao.save();
    return true;
  }

  async delete(id: number) {
    const especializacao = await Especializacao.findOneBy({ id_especializacao: id });
    if (!especializacao) {
      return false;
    }

    await especializacao.remove();
    return true;
  }

  async getById(id: number) {
    return await Especializacao.findOneBy({ id_especializacao: id });
  }
}