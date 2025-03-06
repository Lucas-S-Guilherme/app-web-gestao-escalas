import { Controller, Get, Post, Param, Body, Render, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { TurnoTrabalhoService } from './turno-trabalho.service';
import { TurnoTrabalhoValidator } from './turno-trabalho.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';
import { Escala } from 'src/modules/escala/escala.entity';

@Controller('turno_trabalho')
export class TurnoTrabalhoController {
  constructor(private readonly service: TurnoTrabalhoService) {}

  @Get()
  @Render('turno_trabalho/index')
  async index(@Res() res: Response) {
    try {
      const turnos = await this.service.getAll();
      return { turnos };
    } catch (error) {
      console.error('Erro ao buscar turnos de trabalho:', error);
      return res.status(500).send('Erro interno do servidor');
    }
  }

  @Get('novo')
  @Render('turno_trabalho/form')
  async createForm(@Res() res: Response) {
    try {
      // Carregar as escalas para o select
      const escalas = await Escala.find();
      return { escalas };
    } catch (error) {
      console.error('Erro ao carregar escalas:', error);
      return res.status(500).send('Erro interno do servidor');
    }
  }

  @Post('novo')
  async createSave(@Res() response: Response, @Req() request, @Body() data) {
    try {
      const validador = await new TurnoTrabalhoValidator().validate(data);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect('/turno_trabalho/novo');
      }

      await this.service.create(validador.getData);
      return response.redirect('/turno_trabalho');
    } catch (error) {
      console.error('Erro ao criar turno de trabalho:', error);
      setFlashErrors(request, [error.message || 'Ocorreu um erro ao tentar criar o turno.']);
      return response.redirect('/turno_trabalho/novo');
    }
  }

  @Get(':id/atualizacao')
  @Render('turno_trabalho/form')
  async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const turno = await this.service.getById(id);
      if (!turno) {
        setFlashErrors(request, ['Turno de trabalho não encontrado.']);
        return response.redirect('/turno_trabalho');
      }

      // Carrega as escalas para permitir alteração
      const escalas = await Escala.find();

      return { turno, escalas };
    } catch (error) {
      console.error('Erro ao buscar turno:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar o turno. Tente novamente.']);
      return response.redirect('/turno_trabalho');
    }
  }

  @Post(':id/atualizacao')
  async updateSave(@Param('id') id: number, @Res() response: Response, @Req() request, @Body() data) {
    try {
      const validador = await new TurnoTrabalhoValidator().validate(data);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect(`/turno_trabalho/${id}/atualizacao`);
      }

      const result = await this.service.update(id, validador.getData);
      if (!result) {
        setFlashErrors(request, ['Erro ao atualizar o turno de trabalho. Tente novamente.']);
        return response.redirect(`/turno_trabalho/${id}/atualizacao`);
      }
    } catch (error) {
      console.error('Erro ao atualizar turno de trabalho:', error);
      setFlashErrors(request, [error.message || 'Ocorreu um erro ao atualizar o turno.']);
      return response.redirect(`/turno_trabalho/${id}/atualizacao`);
    }

    return response.redirect('/turno_trabalho');
  }

  @Get(':id/exclusao')
  @Render('turno_trabalho/confirmar-exclusao')
  async confirmDelete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const turno = await this.service.getById(id);
      if (!turno) {
        setFlashErrors(request, ['Turno não encontrado.']);
        return response.redirect('/turno_trabalho');
      }

      return { turno };
    } catch (error) {
      console.error('Erro ao buscar turno:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar o turno. Tente novamente.']);
      return response.redirect('/turno_trabalho');
    }
  }

  @Post(':id/exclusao')
  async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const result = await this.service.delete(id);
      if (!result) {
        setFlashErrors(request, ['Erro ao excluir o turno de trabalho. Tente novamente.']);
      }
    } catch (error) {
      console.error('Erro ao excluir turno de trabalho:', error);
      setFlashErrors(request, [error.message || 'Ocorreu um erro ao excluir o turno.']);
    }

    return response.redirect('/turno_trabalho');
  }
}
