import { Controller, Post, Body, Put, Get, Render, Req, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { EscalaService } from './escala.service';
import { EscalaValidator } from './escala.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('escala')
export class EscalaController {
  constructor(private readonly service: EscalaService) {}

  @Get()
  @Render('escala/index')
  async index(@Res() res: Response) {
    try {
      const escalas = await this.service.getAll();
      return { escalas };
    } catch (error) {
      console.error('Erro ao buscar escalas:', error);
      return res.status(500).send('Erro interno do servidor');
    }
  }

  @Get('novo')
  @Render('escala/form')
  createForm() {
    return {};
  }

  @Post('novo')
  async createSave(@Res() response: Response, @Req() request, @Body() data) {
    try {
      const validador = await new EscalaValidator().validate(data);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect('/escala/novo');
      }

      await this.service.create(validador.getData);
      return response.redirect('/escala');
    } catch (error) {
      console.error('Erro ao criar escala:', error);
      setFlashErrors(request, ['Ocorreu um erro ao tentar criar a escala. Tente novamente.']);
      return response.redirect('/escala/novo');
    }
  }

  @Get(':id/atualizacao')
  @Render('escala/form')
  async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const escala = await this.service.getById(id);

      if (!escala) {
        setFlashErrors(request, ['Escala não encontrada.']);
        return response.redirect('/escala');
      }

      return { escala };
    } catch (error) {
      console.error('Erro ao buscar escala:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar a escala. Tente novamente.']);
      return response.redirect('/escala');
    }
  }

  @Post(':id/atualizacao')
  async updateSave(@Param('id') id: number, @Res() response: Response, @Req() request, @Body() data) {
    try {
      const validador = await new EscalaValidator().validate(data);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect(`/escala/${id}/atualizacao`);
      }

      const result = await this.service.update(id, validador.getData);

      if (!result) {
        setFlashErrors(request, ['Erro ao atualizar a escala. Tente novamente.']);
        return response.redirect(`/escala/${id}/atualizacao`);
      }
    } catch (error) {
      console.error('Erro ao atualizar escala:', error);
      setFlashErrors(request, ['Ocorreu um erro ao atualizar a escala. Tente novamente.']);
      return response.redirect(`/escala/${id}/atualizacao`);
    }

    return response.redirect('/escala');
  }

  @Get(':id/exclusao')
  @Render('escala/confirmar-exclusao')
  async confirmDelete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const escala = await this.service.getById(id);

      if (!escala) {
        setFlashErrors(request, ['Escala não encontrada.']);
        return response.redirect('/escala');
      }

      return { escala };
    } catch (error) {
      console.error('Erro ao buscar escala:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar a escala. Tente novamente.']);
      return response.redirect('/escala');
    }
  }

  @Post(':id/exclusao')
  async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const escala = await this.service.getById(id);

      if (!escala) {
        setFlashErrors(request, ['Escala não encontrada.']);
        return response.redirect('/escala');
      }

      const result = await this.service.delete(id);

      if (!result) {
        setFlashErrors(request, ['Erro ao excluir a escala. Tente novamente.']);
      }
    } catch (error) {
      console.error('Erro ao excluir escala:', error);
      setFlashErrors(request, ['Ocorreu um erro ao excluir a escala. Tente novamente.']);
    }

    return response.redirect('/escala');
  }
}