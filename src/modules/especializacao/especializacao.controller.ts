// src/modules/especializacao/especializacao.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, Render, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { EspecializacaoService } from './especializacao.service';
import { EspecializacaoValidator } from './especializacao.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('especializacao')
export class EspecializacaoController {
  constructor(private readonly service: EspecializacaoService) {}

  @Get()
  @Render('especializacao/index')
  async index(@Res() res: Response) {
    try {
      console.log('[DEBUG] Acessando rota /especializacao');
      const especializacoes = await this.service.getAll();
      
      if (!especializacoes || especializacoes.length === 0) {
        console.warn('[AVISO] Nenhuma especialização encontrada no banco');
      }
      
      return { especializacoes };
    } catch (error) {
      console.error('[ERRO] Falha no controlador:', error.message);
      return res.status(500).send('Erro interno do servidor');
    }
  }

  @Get('novo')
  @Render('especializacao/form')
  createForm() {
    return {};
  }

  @Post('novo')
  async createSave(@Res() response: Response, @Req() request, @Body() data) {
    try {
      const validador = await new EspecializacaoValidator().validate(data);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect('/especializacao/novo');
      }

      await this.service.create(validador.getData);
    } catch (error) {
      console.error('Erro ao criar especialização:', error);
      setFlashErrors(request, ['Ocorreu um erro ao tentar criar a especialização. Tente novamente.']);
      return response.redirect('/especializacao/novo');
    }

    return response.redirect('/especializacao');
  }

  @Get(':id/atualizacao')
  @Render('especializacao/form')
  async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const especializacao = await this.service.getById(id);

      if (!especializacao) {
        setFlashErrors(request, ['Especialização não encontrada.']);
        return response.redirect('/especializacao');
      }

      return { especializacao };
    } catch (error) {
      console.error('Erro ao buscar especialização:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar a especialização. Tente novamente.']);
      return response.redirect('/especializacao');
    }
  }

    @Post(':id/atualizacao')
    async updateSave(@Param('id') id: number, @Res() response: Response, @Req() request, @Body() data) {
    try {
        console.log('[DEBUG] Dados recebidos para atualização:', data); // Log dos dados recebidos

        if (!data) {
        console.error('[ERRO] Dados não foram recebidos corretamente.');
        setFlashErrors(request, ['Dados inválidos. Tente novamente.']);
        return response.redirect(`/especializacao/${id}/atualizacao`);
        }

        const validador = await new EspecializacaoValidator().validate(data);

        if (validador.isError) {
        console.warn('[AVISO] Erros de validação:', validador.getErrors); // Log dos erros de validação
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect(`/especializacao/${id}/atualizacao`);
        }

        const result = await this.service.update(id, validador.getData);

        if (!result) {
        console.warn('[AVISO] Falha ao atualizar a especialização com ID:', id); // Log de falha na atualização
        setFlashErrors(request, ['Erro ao atualizar a especialização. Tente novamente.']);
        return response.redirect(`/especializacao/${id}/atualizacao`);
        }

        console.log('[DEBUG] Especialização atualizada com sucesso:', result); // Log de sucesso na atualização
    } catch (error) {
        console.error('Erro ao atualizar especialização:', error);
        setFlashErrors(request, ['Ocorreu um erro ao atualizar a especialização. Tente novamente.']);
        return response.redirect(`/especializacao/${id}/atualizacao`);
    }

    return response.redirect('/especializacao');
    }

  @Get(':id/exclusao')
  @Render('especializacao/confirmar-exclusao')
  async confirmDelete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const especializacao = await this.service.getById(id);

      if (!especializacao) {
        setFlashErrors(request, ['Especialização não encontrada.']);
        return response.redirect('/especializacao');
      }

      return { especializacao };
    } catch (error) {
      console.error('Erro ao buscar especialização:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar a especialização. Tente novamente.']);
      return response.redirect('/especializacao');
    }
  }

  @Post(':id/exclusao')
  async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const especializacao = await this.service.getById(id);

      if (!especializacao) {
        setFlashErrors(request, ['Especialização não encontrada.']);
        return response.redirect('/especializacao');
      }

      const result = await this.service.delete(id);

      if (!result) {
        setFlashErrors(request, ['Erro ao excluir a especialização. Tente novamente.']);
      }
    } catch (error) {
      console.error('Erro ao excluir especialização:', error);
      setFlashErrors(request, ['Ocorreu um erro ao excluir a especialização. Tente novamente.']);
    }

    return response.redirect('/especializacao');
  }
}