import { Controller, Post, Body, Put, Get, Render, Req, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { CombatenteService } from './combatente.service';
import { CombatenteValidator } from './combatente.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('combatente')
export class CombatenteController {
  constructor(private readonly service: CombatenteService) {}

  @Get()
  @Render('combatente/index')
  async index(@Res() res: Response) {
    try {
      const combatentes = await this.service.getAll();
      return { combatentes };
    } catch (error) {
      console.error('Erro ao buscar combatentes:', error);
      return res.status(500).send('Erro interno do servidor');
    }
  }

  @Get('novo')
  @Render('combatente/form')
  createForm() {
    return {};
  }

  @Post('novo')
  async createSave(@Res() response: Response, @Req() request, @Body() data) {
    try {
      const validador = await new CombatenteValidator().validate(data);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect('/combatente/novo');
      }

      await this.service.create(validador.getData);
      return response.redirect('/combatente');
    } catch (error) {
      console.error('Erro ao criar combatente:', error);
      setFlashErrors(request, ['Ocorreu um erro ao tentar criar o combatente. Tente novamente.']);
      return response.redirect('/combatente/novo');
    }
  }

  @Get(':id/atualizacao')
  @Render('combatente/form')
  async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const combatente = await this.service.getById(id);

      if (!combatente) {
        setFlashErrors(request, ['Combatente não encontrado.']);
        return response.redirect('/combatente');
      }

      return { combatente };
    } catch (error) {
      console.error('Erro ao buscar combatente:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar o combatente. Tente novamente.']);
      return response.redirect('/combatente');
    }
  }

  @Post(':id/atualizacao')
  async updateSave(@Param('id') id: number, @Res() response: Response, @Req() request, @Body() data) {
    try {
      const validador = await new CombatenteValidator().validate(data);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect(`/combatente/${id}/atualizacao`);
      }

      const result = await this.service.update(id, validador.getData);

      if (!result) {
        setFlashErrors(request, ['Erro ao atualizar o combatente. Tente novamente.']);
        return response.redirect(`/combatente/${id}/atualizacao`);
      }
    } catch (error) {
      console.error('Erro ao atualizar combatente:', error);
      setFlashErrors(request, ['Ocorreu um erro ao atualizar o combatente. Tente novamente.']);
      return response.redirect(`/combatente/${id}/atualizacao`);
    }

    return response.redirect('/combatente');
  }

  @Get(':id/exclusao')
  @Render('combatente/confirmar-exclusao')
  async confirmDelete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const combatente = await this.service.getById(id);

      if (!combatente) {
        setFlashErrors(request, ['Combatente não encontrado.']);
        return response.redirect('/combatente');
      }

      return { combatente };
    } catch (error) {
      console.error('Erro ao buscar combatente:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar o combatente. Tente novamente.']);
      return response.redirect('/combatente');
    }
  }

  @Post(':id/exclusao')
  async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const combatente = await this.service.getById(id);

      if (!combatente) {
        setFlashErrors(request, ['Combatente não encontrado.']);
        return response.redirect('/combatente');
      }

      const result = await this.service.delete(id);

      if (!result) {
        setFlashErrors(request, ['Erro ao excluir o combatente. Tente novamente.']);
      }
    } catch (error) {
      console.error('Erro ao excluir combatente:', error);
      setFlashErrors(request, ['Ocorreu um erro ao excluir o combatente. Tente novamente.']);
    }

    return response.redirect('/combatente');
  }
}