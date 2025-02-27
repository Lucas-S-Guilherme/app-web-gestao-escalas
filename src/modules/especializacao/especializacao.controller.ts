// src/modules/especializacao/especializacao.controller.ts
import { Controller, Post, Body, Put, Get, Render, Req, Res, Param, Delete } from '@nestjs/common';
import { Response } from 'express';
import { EspecializacaoService } from './especializacao.service';
import { EspecializacaoValidator } from './especializacao.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('especializacao')
export class EspecializacaoController {
  constructor(private readonly service: EspecializacaoService) {}

  @Get()
  @Render('especializacao/index')
  async index() {
    return { especializacoes: await this.service.getAll() };
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
    } catch (err) {
      console.log(err);
      setFlashErrors(request, ['Ocorreu um erro ao tentar cadastrar a especialização.']);
      return response.redirect('/especializacao/novo');
    }

    return response.redirect('/especializacao');
  }

  @Get(':id/atualizacao')
  @Render('especializacao/form')
  async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const especializacao = await this.service.findOneById(id);

      if (!especializacao) {
        setFlashErrors(request, ['Especialização não encontrada.']);
        return response.redirect('/especializacao');
      }

      return { especializacao };
    } catch (err) {
      console.log(err);
      setFlashErrors(request, ['Erro ao buscar informações da especialização.']);
      return response.redirect('/especializacao');
    }
  }

  @Post(':id/atualizacao')
  async updateSave(@Param('id') id: number, @Body() data, @Res() response: Response, @Req() request) {
    try {
      const validador = await new EspecializacaoValidator().validate(data, true);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);

        return response.redirect(`/especializacao/${id}/atualizacao`);
      }

      const result = await this.service.update(id, validador.getData);

      if (!result) {
        setFlashErrors(request, ['Falha ao atualizar a especialização.']);
        return response.redirect(`/especializacao/${id}/atualizacao`);
      }
    } catch (err) {
      console.log(err);
      setFlashErrors(request, ['Erro ao tentar atualizar a especialização.']);
      return response.redirect(`/especializacao/${id}/atualizacao`);
    }

    return response.redirect('/especializacao');
  }

  @Get(':id/exclusao')
  async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const especializacao = await this.service.findOneById(id);

      if (!especializacao) {
        setFlashErrors(request, ['Especialização não encontrada.']);
      }

      const result = await this.service.delete(id);

      if (!result) {
        setFlashErrors(request, ['Falha ao excluir a especialização.']);
      }
    } catch (err) {
      console.log(err);
      setFlashErrors(request, ['Erro ao tentar excluir a especialização.']);
    }

    return response.redirect('/especializacao');
  }
}