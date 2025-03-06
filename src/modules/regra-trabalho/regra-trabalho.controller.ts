// src/modules/regra-trabalho/regra-trabalho.controller.ts
import { Controller, Post, Body, Put, Get, Render, Req, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { RegraTrabalhoService } from './regra-trabalho.service';
import { RegraTrabalhoValidator } from './regra-trabalho.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('regra-trabalho')
export class RegraTrabalhoController {
    constructor(private readonly service: RegraTrabalhoService) {}

    @Get()
    @Render('regra-trabalho/index')
    async index(@Res() res: Response) {
        try {
            const regrasTrabalho = await this.service.getAll();
            return { regrasTrabalho };
        } catch (error) {
            console.error('Erro ao buscar regras de trabalho:', error);
            return res.status(500).send('Erro interno do servidor');
        }
    }

    @Get('novo')
    @Render('regra-trabalho/form')
    createForm() {
        return {};
    }

    @Post('novo')
    async createSave(@Res() response: Response, @Req() request, @Body() data) {
        try {
            console.log('Dados recebidos no controlador:', data); // Log dos dados brutos

            const validador = await new RegraTrabalhoValidator().validate(data);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, data);
                return response.redirect('/regra-trabalho/novo');
            }

            console.log('Dados validados:', validador.getData); // Log dos dados validados

            await this.service.create(validador.getData);
            return response.redirect('/regra-trabalho');
        } catch (error) {
            console.error('Erro ao criar regra de trabalho:', error);
            setFlashErrors(request, ['Ocorreu um erro ao tentar criar a regra de trabalho. Tente novamente.']);
            return response.redirect('/regra-trabalho/novo');
        }
    }

    @Get(':id/atualizacao')
    @Render('regra-trabalho/form')
    async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const regraTrabalho = await this.service.getById(id);

            if (!regraTrabalho) {
                setFlashErrors(request, ['Regra de trabalho não encontrada.']);
                return response.redirect('/regra-trabalho');
            }

            return { regraTrabalho };
        } catch (error) {
            console.error('Erro ao buscar regra de trabalho:', error);
            setFlashErrors(request, ['Ocorreu um erro ao buscar a regra de trabalho. Tente novamente.']);
            return response.redirect('/regra-trabalho');
        }
    }

    @Post(':id/atualizacao')
    async updateSave(@Param('id') id: number, @Res() response: Response, @Req() request, @Body() data) {
        try {
            const validador = await new RegraTrabalhoValidator().validate(data);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, data);
                return response.redirect(`/regra-trabalho/${id}/atualizacao`);
            }

            const result = await this.service.update(id, validador.getData);

            if (!result) {
                setFlashErrors(request, ['Erro ao atualizar a regra de trabalho. Tente novamente.']);
                return response.redirect(`/regra-trabalho/${id}/atualizacao`);
            }
        } catch (error) {
            console.error('Erro ao atualizar regra de trabalho:', error);
            setFlashErrors(request, ['Ocorreu um erro ao atualizar a regra de trabalho. Tente novamente.']);
            return response.redirect(`/regra-trabalho/${id}/atualizacao`);
        }

        return response.redirect('/regra-trabalho');
    }

    @Get(':id/exclusao')
    @Render('regra-trabalho/confirmar-exclusao')
    async confirmDelete(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const regraTrabalho = await this.service.getById(id);

            if (!regraTrabalho) {
                setFlashErrors(request, ['Regra de trabalho não encontrada.']);
                return response.redirect('/regra-trabalho');
            }

            return { regraTrabalho };
        } catch (error) {
            console.error('Erro ao buscar regra de trabalho:', error);
            setFlashErrors(request, ['Ocorreu um erro ao buscar a regra de trabalho. Tente novamente.']);
            return response.redirect('/regra-trabalho');
        }
    }

    @Post(':id/exclusao')
    async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const regraTrabalho = await this.service.getById(id);

            if (!regraTrabalho) {
                setFlashErrors(request, ['Regra de trabalho não encontrada.']);
                return response.redirect('/regra-trabalho');
            }

            const result = await this.service.delete(id);

            if (!result) {
                setFlashErrors(request, ['Erro ao excluir a regra de trabalho. Tente novamente.']);
            }
        } catch (error) {
            console.error('Erro ao excluir regra de trabalho:', error);
            setFlashErrors(request, ['Ocorreu um erro ao excluir a regra de trabalho. Tente novamente.']);
        }

        return response.redirect('/regra-trabalho');
    }
}