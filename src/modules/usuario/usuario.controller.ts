// src/modules/usuario/usuario.controller.ts
import { Controller, Post, Body, Put, Get, Render, Req, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { UsuarioService } from './usuario.service';
import { UsuarioValidator } from './usuario.validator';
import { setFlashErrors, setOld } from 'src/commom/helpers/flash-errors';


Controller('usuario')
export class UsuarioController {
  constructor(private readonly service: UsuarioService) {}

  @Get()
  @Render('usuario/index')
  async index() {
    return { usuario: await this.service.getAll() };
  }

  //Rota de Cadastro
  //Abrir o formulario
  @Get('novo')
  @Render('usuario/form')
  createForm() {
    return {};
  }

  //Rota para Salvar os dados de cadastro
  @Post('novo')
  async createSave(@Res() response: Response, @Req() request, @Body() data) {
    try {
      const validador = await new UsuarioValidator().validate(data);

      console.log(validador.getData, validador.getErrors, validador.isError);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);

        return response.redirect('/usuario/novo');
      }

      await this.service.create(data);
    } catch (err) {
      console.log(err);
    }

    return response.redirect('/usuario');
  }

  //Rota de Atualização (Update)
  //Abrir o formulario
  @Get(':id/atualizacao')
  @Render('usuario/form')
  updateForm() {
    return {};
  }
  //Rota para Salvar os dados de atualização

  //Rota de Confirmação de Exclusão (Update)
  //Abrir o formulario

  //Rota para Excluir
}

//criar um novo modulo
//npx nest g mo servidor modules

//criar um novo controller
//npx nest g co servidor modules

//criar um novo service
//npx nest g s servidor modules
