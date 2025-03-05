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
    try {
      console.log('[DEBUG] Dados recebidos para atualização no serviço:', data); // Log dos dados recebidos
  
      if (!data) {
        throw new Error('Dados inválidos para atualização.');
      }
  
      const especializacao = await Especializacao.findOneBy({ id_especializacao: id });
      if (!especializacao) {
        console.warn('[AVISO] Especialização não encontrada para o ID:', id);
        return false;
      }
  
      // Atualiza os campos da especialização
      especializacao.nome_especializacao = data.nome_especializacao;
      especializacao.descricao_especializacao = data.descricao_especializacao;
      especializacao.sigla_especializacao = data.sigla_especializacao;
  
      await especializacao.save();
      console.log('[DEBUG] Especialização atualizada com sucesso:', especializacao); // Log da especialização atualizada
      return true;
    } catch (error) {
      console.error('[ERRO] Falha ao atualizar especialização:', error);
      throw new Error('Erro interno ao atualizar especialização');
    }
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