// src/modules/funcao/funcao.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, Render, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { FuncaoService } from './funcao.service';
import { FuncaoValidator } from './funcao.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('funcao')
export class FuncaoController {
  constructor(private readonly service: FuncaoService) {}

  @Get()
  @Render('funcao/index')
  async index(@Res() res: Response) {
    try {
      console.log('[DEBUG] Acessando rota /funcao');
      const funcoes = await this.service.getAll();

      if (!funcoes || funcoes.length === 0) {
        console.warn('[AVISO] Nenhuma função encontrada no banco');
      }

      return { funcoes };
    } catch (error) {
      console.error('[ERRO] Falha no controlador:', error.message);
      return res.status(500).send('Erro interno do servidor');
    }
  }

  @Get('novo')
  @Render('funcao/form')
  createForm() {
    return {};
  }

  @Post('novo')
  async createSave(@Res() response: Response, @Req() request, @Body() data) {
    try {
      const validador = await new FuncaoValidator().validate(data);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect('/funcao/novo');
      }

      await this.service.create(validador.getData);
    } catch (error) {
      console.error('Erro ao criar função:', error);
      setFlashErrors(request, ['Ocorreu um erro ao tentar criar a função. Tente novamente.']);
      return response.redirect('/funcao/novo');
    }

    return response.redirect('/funcao');
  }

  @Get(':id/atualizacao')
  @Render('funcao/form')
  async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const funcao = await this.service.getById(id);

      if (!funcao) {
        setFlashErrors(request, ['Função não encontrada.']);
        return response.redirect('/funcao');
      }

      return { funcao };
    } catch (error) {
      console.error('Erro ao buscar função:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar a função. Tente novamente.']);
      return response.redirect('/funcao');
    }
  }

  @Post(':id/atualizacao')
  async updateSave(@Param('id') id: number, @Res() response: Response, @Req() request, @Body() data) {
    try {
      console.log('[DEBUG] Dados recebidos para atualização:', data);

      if (!data) {
        console.error('[ERRO] Dados não foram recebidos corretamente.');
        setFlashErrors(request, ['Dados inválidos. Tente novamente.']);
        return response.redirect(`/funcao/${id}/atualizacao`);
      }

      const validador = await new FuncaoValidator().validate(data);

      if (validador.isError) {
        console.warn('[AVISO] Erros de validação:', validador.getErrors);
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect(`/funcao/${id}/atualizacao`);
      }

      const result = await this.service.update(id, validador.getData);

      if (!result) {
        console.warn('[AVISO] Falha ao atualizar a função com ID:', id);
        setFlashErrors(request, ['Erro ao atualizar a função. Tente novamente.']);
        return response.redirect(`/funcao/${id}/atualizacao`);
      }

      console.log('[DEBUG] Função atualizada com sucesso:', result);
    } catch (error) {
      console.error('Erro ao atualizar função:', error);
      setFlashErrors(request, ['Ocorreu um erro ao atualizar a função. Tente novamente.']);
      return response.redirect(`/funcao/${id}/atualizacao`);
    }

    return response.redirect('/funcao');
  }

  @Get(':id/exclusao')
  @Render('funcao/confirmar-exclusao')
  async confirmDelete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const funcao = await this.service.getById(id);

      if (!funcao) {
        setFlashErrors(request, ['Função não encontrada.']);
        return response.redirect('/funcao');
      }

      return { funcao };
    } catch (error) {
      console.error('Erro ao buscar função:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar a função. Tente novamente.']);
      return response.redirect('/funcao');
    }
  }

  @Post(':id/exclusao')
  async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const funcao = await this.service.getById(id);

      if (!funcao) {
        setFlashErrors(request, ['Função não encontrada.']);
        return response.redirect('/funcao');
      }

      const result = await this.service.delete(id);

      if (!result) {
        setFlashErrors(request, ['Erro ao excluir a função. Tente novamente.']);
      }
    } catch (error) {
      console.error('Erro ao excluir função:', error);
      setFlashErrors(request, ['Ocorreu um erro ao excluir a função. Tente novamente.']);
    }

    return response.redirect('/funcao');
  }
}