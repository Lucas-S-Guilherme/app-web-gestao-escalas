// src/modules/restricao/restricao.service.ts
import { Injectable } from '@nestjs/common';
import { Restricao } from './restricao.entity';

@Injectable()
export class RestricaoService {
  async getAll() {
    try {
      console.log('[DEBUG] Buscando restrições no banco...');
      const restricoes = await Restricao.find();
      console.log('[DEBUG] Restrições encontradas:', JSON.stringify(restricoes, null, 2));
      return restricoes;
    } catch (error) {
      console.error('[ERRO CRÍTICO] Falha na busca:', error.stack);
      throw new Error('Erro interno ao carregar restrições');
    }
  }

  async create(data: any) {
    const restricao = Restricao.create({ ...data });
    return await restricao.save();
  }

  async update(id: number, data: any) {
    try {
      console.log('[DEBUG] Dados recebidos para atualização no serviço:', data);

      if (!data) {
        throw new Error('Dados inválidos para atualização.');
      }

      const restricao = await Restricao.findOneBy({ id_restricao: id });
      if (!restricao) {
        console.warn('[AVISO] Restrição não encontrada para o ID:', id);
        return false;
      }

      // Atualiza os campos da restrição
      restricao.nome_restricao = data.nome_restricao;
      restricao.grupo_restricao = data.grupo_restricao;
      restricao.descricao_restricao = data.descricao_restricao;

      await restricao.save();
      console.log('[DEBUG] Restrição atualizada com sucesso:', restricao);
      return true;
    } catch (error) {
      console.error('[ERRO] Falha ao atualizar restrição:', error);
      throw new Error('Erro interno ao atualizar restrição');
    }
  }

  async delete(id: number) {
    const restricao = await Restricao.findOneBy({ id_restricao: id });
    if (!restricao) {
      return false;
    }

    await restricao.remove();
    return true;
  }

  async getById(id: number) {
    return await Restricao.findOneBy({ id_restricao: id });
  }
}