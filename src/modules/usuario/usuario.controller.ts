import { Controller, Post, Body, Put, Get, Render, Req, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { UsuarioService } from './usuario.service';
import { UsuarioValidator } from './usuario.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly service: UsuarioService) {}

  @Get()
  @Render('usuario/index')
  async index(@Res() res: Response) {
    try {
      console.log('[DEBUG] Acessando rota /usuario');
      const usuarios = await this.service.getAll();
      
      if (!usuarios || usuarios.length === 0) {
        console.warn('[AVISO] Nenhum usuário encontrado no banco');
      }
      
      return { usuarios };
    } catch (error) {
      console.error('[ERRO] Falha no controlador:', error.message);
      return res.status(500).send('Erro interno do servidor');
    }
  }

  // Rota de Cadastro - Abrir o formulário
  @Get('novo')
  @Render('usuario/form')
  createForm() {
    return {};
  }

  @Get('buscar')
  async buscarUsuarios(@Res() res: Response) {
    try {
      const usuarios = await this.service.getAll();
      return res.json({ usuarios });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  // Rota para Salvar os dados de cadastro
  // usuario.controller.ts
  @Post('novo')
  async createSave(@Res() response: Response, @Req() request, @Body() data) {
    try {
      console.log('[DEBUG] Dados recebidos no controlador:', data); // Log para depuração

      const validador = await new UsuarioValidator().validate(data);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect('/usuario/novo');
      }

      await this.service.create(validador.getData);
      return response.redirect('/usuario');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setFlashErrors(request, ['Ocorreu um erro ao tentar criar o usuário. Tente novamente.']);
      return response.redirect('/usuario/novo');
    }
  }

  // Rota de Atualização - Abrir o formulário
  @Get(':id/atualizacao')
  @Render('usuario/form')
  async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const usuario = await this.service.getById(id);

      if (!usuario) {
        setFlashErrors(request, ['Usuário não encontrado.']);
        return response.redirect('/usuario');
      }

      return { usuario };
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar o usuário. Tente novamente.']);
      return response.redirect('/usuario');
    }
  }

  // Rota para Salvar os dados de atualização
  @Post(':id/atualizacao')
  async updateSave(@Param('id') id: number, @Res() response: Response, @Req() request, @Body() data) {
    try {
      const validador = await new UsuarioValidator().validate(data);

      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, data);
        return response.redirect(`/usuario/${id}/atualizacao`);
      }

      const result = await this.service.update(id, validador.getData);

      if (!result) {
        setFlashErrors(request, ['Erro ao atualizar o usuário. Tente novamente.']);
        return response.redirect(`/usuario/${id}/atualizacao`);
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      setFlashErrors(request, ['Ocorreu um erro ao atualizar o usuário. Tente novamente.']);
      return response.redirect(`/usuario/${id}/atualizacao`);
    }

    return response.redirect('/usuario');
  }

  // Rota de Confirmação de Exclusão - Abrir o formulário
  @Get(':id/exclusao')
  @Render('usuario/confirmar-exclusao')
  async confirmDelete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const usuario = await this.service.getById(id);

      if (!usuario) {
        setFlashErrors(request, ['Usuário não encontrado.']);
        return response.redirect('/usuario');
      }

      return { usuario };
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      setFlashErrors(request, ['Ocorreu um erro ao buscar o usuário. Tente novamente.']);
      return response.redirect('/usuario');
    }
  }

  // Rota para Excluir
  @Post(':id/exclusao')
  async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
    try {
      const usuario = await this.service.getById(id);

      if (!usuario) {
        setFlashErrors(request, ['Usuário não encontrado.']);
        return response.redirect('/usuario');
      }

      const result = await this.service.delete(id);

      if (!result) {
        setFlashErrors(request, ['Erro ao excluir o usuário. Tente novamente.']);
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      setFlashErrors(request, ['Ocorreu um erro ao excluir o usuário. Tente novamente.']);
    }

    return response.redirect('/usuario');
  }

  


}