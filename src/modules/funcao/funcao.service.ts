// src/modules/funcao/funcao.service.ts
import { Injectable } from '@nestjs/common';
import { Funcao } from './funcao.entity';

@Injectable()
export class FuncaoService {
  async getAll() {
    try {
      console.log('[DEBUG] Buscando funções no banco...');
      const funcoes = await Funcao.find();
      console.log('[DEBUG] Funções encontradas:', JSON.stringify(funcoes, null, 2));
      return funcoes;
    } catch (error) {
      console.error('[ERRO CRÍTICO] Falha na busca:', error.stack);
      throw new Error('Erro interno ao carregar funções');
    }
  }

  async create(data: any) {
    const funcao = Funcao.create({ ...data });
    return await funcao.save();
  }

  async update(id: number, data: any) {
    try {
      console.log('[DEBUG] Dados recebidos para atualização no serviço:', data);

      if (!data) {
        throw new Error('Dados inválidos para atualização.');
      }

      const funcao = await Funcao.findOneBy({ id_funcao: id });
      if (!funcao) {
        console.warn('[AVISO] Função não encontrada para o ID:', id);
        return false;
      }

      // Atualiza os campos da função
      funcao.nome_funcao = data.nome_funcao;
      funcao.sigla_funcao = data.sigla_funcao;

      await funcao.save();
      console.log('[DEBUG] Função atualizada com sucesso:', funcao);
      return true;
    } catch (error) {
      console.error('[ERRO] Falha ao atualizar função:', error);
      throw new Error('Erro interno ao atualizar função');
    }
  }

  async delete(id: number) {
    const funcao = await Funcao.findOneBy({ id_funcao: id });
    if (!funcao) {
      return false;
    }

    await funcao.remove();
    return true;
  }

  async getById(id: number) {
    return await Funcao.findOneBy({ id_funcao: id });
  }
}