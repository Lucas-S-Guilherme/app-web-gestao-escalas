// src/modules/usuario/usuario.controller.ts
import { Controller, Post, Body, Put, Get, Render, Req, Res, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';


Controller('usuario')
export class UsuarioController {
  constructor(private readonly service: UsuarioService) {}

  @Get()
  @Render('usuario/index')
  async index() {
    return { servidores: await this.service.getAll() };
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
      const validador = await new ServidorValidator().validate(data);

      console.log(validador.getData, validador.getErrors, validador.isError);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);

        return response.redirect('/servidores/novo');
      }

      await this.service.create(data);
    } catch (err) {
      console.log(err);
    }

    return response.redirect('/servidores');
  }

  //Rota de Atualização (Update)
  //Abrir o formulario
  @Get(':id/atualizacao')
  @Render('servidor/form')
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
