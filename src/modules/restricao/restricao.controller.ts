// src/modules/restricao/restricao.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, Render, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { RestricaoService } from './restricao.service';
import { RestricaoValidator } from './restricao.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('restricao')
export class RestricaoController {
  constructor(private readonly service: RestricaoService) {}

  @Get()
  @Render('restricao/index')
  async index(@Res() res: Response) {
    try {
      console.log('[DEBUG] Acessando rota /restricao');
      const restricoes = await this.service.getAll();

      if (!restricoes || restricoes.length === 0) {
        console.warn('[AVISO] Nenhuma restrição encontrada no banco');
      }

      return { restricoes };
    } catch (error) {
      console.error('[ERRO] Falha no controlador:', error.message);
      return res.status(500).send('Erro interno do servidor');
    }
  }

  @Get('novo')
  @Render('restricao/form')
  createForm() {
    return {};
  }

  @Post('novo')
  async createSave(@Res() response: Response, @Req() request, @Body() data) {
    try {
      const validador = await new RestricaoValidator().validate(data);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect('/restricao/novo');
      }

      await this.service.create(validador.getData);
    } catch (error) {
      console.error('Erro ao criar restrição:', error);
      setFlashErrors(request, ['Ocorreu um erro ao tentar criar a restrição. Tente novamente.']);
      return response.redirect('/restricao/novo');
    }

    return response.redirect('/restricao');
  }

  @Get(':id/atualizacao')
  @Render('restricao/form')
  async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const restricao = await this.service.getById(id);

      if (!restricao) {
        setFlashErrors(request, ['Restrição não encontrada.']);
        return response.redirect('/restricao');
      }

      return { restricao };
    } catch (error) {
      console.error('Erro ao buscar restrição:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar a restrição. Tente novamente.']);
      return response.redirect('/restricao');
    }
  }

  @Post(':id/atualizacao')
  async updateSave(@Param('id') id: number, @Res() response: Response, @Req() request, @Body() data) {
    try {
      console.log('[DEBUG] Dados recebidos para atualização:', data);

      if (!data) {
        console.error('[ERRO] Dados não foram recebidos corretamente.');
        setFlashErrors(request, ['Dados inválidos. Tente novamente.']);
        return response.redirect(`/restricao/${id}/atualizacao`);
      }

      const validador = await new RestricaoValidator().validate(data);

      if (validador.isError) {
        console.warn('[AVISO] Erros de validação:', validador.getErrors);
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect(`/restricao/${id}/atualizacao`);
      }

      const result = await this.service.update(id, validador.getData);

      if (!result) {
        console.warn('[AVISO] Falha ao atualizar a restrição com ID:', id);
        setFlashErrors(request, ['Erro ao atualizar a restrição. Tente novamente.']);
        return response.redirect(`/restricao/${id}/atualizacao`);
      }

      console.log('[DEBUG] Restrição atualizada com sucesso:', result);
    } catch (error) {
      console.error('Erro ao atualizar restrição:', error);
      setFlashErrors(request, ['Ocorreu um erro ao atualizar a restrição. Tente novamente.']);
      return response.redirect(`/restricao/${id}/atualizacao`);
    }

    return response.redirect('/restricao');
  }

  @Get(':id/exclusao')
  @Render('restricao/confirmar-exclusao')
  async confirmDelete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const restricao = await this.service.getById(id);

      if (!restricao) {
        setFlashErrors(request, ['Restrição não encontrada.']);
        return response.redirect('/restricao');
      }

      return { restricao };
    } catch (error) {
      console.error('Erro ao buscar restrição:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar a restrição. Tente novamente.']);
      return response.redirect('/restricao');
    }
  }

  @Post(':id/exclusao')
  async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const restricao = await this.service.getById(id);

      if (!restricao) {
        setFlashErrors(request, ['Restrição não encontrada.']);
        return response.redirect('/restricao');
      }

      const result = await this.service.delete(id);

      if (!result) {
        setFlashErrors(request, ['Erro ao excluir a restrição. Tente novamente.']);
      }
    } catch (error) {
      console.error('Erro ao excluir restrição:', error);
      setFlashErrors(request, ['Ocorreu um erro ao excluir a restrição. Tente novamente.']);
    }

    return response.redirect('/restricao');
  }
}