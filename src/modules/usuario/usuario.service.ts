// src/modules/usuario/usuario.service.ts
import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';


@Injectable()
export class UsuarioService {
    async delete(id: number) {
        const usuario = await Usuario.findOneBy({ id_usuario: id });
        if (!usuario) {
            return false; // Retorna false se o usuário não for encontrado
        }
    
        await usuario.remove();
        return true; // Retorna true se a exclusão for bem-sucedida
    }

    async update(id: number, data: any) {
        const usuario = await Usuario.findOneBy({ id_usuario: id });
        if (!usuario) {
            return false; // Retorna false se o usuário não for encontrado
        }
    
        Object.assign(usuario, data);
        await usuario.save();
        return true; // Retorna true se a atualização for bem-sucedida
    }

    async getById(id: number) {
        return await Usuario.findOneBy({ id_usuario: id });
    }
    
    async getAll() {
      try {
        console.log('[DEBUG] Iniciando busca de usuários no banco...');
        const usuarios = await Usuario.find();
        console.log('[DEBUG] Usuários encontrados:', JSON.stringify(usuarios, null, 2));
        return usuarios;
      } catch (error) {
        console.error('[ERRO CRÍTICO] Falha na busca:', error.stack);
        throw new Error('Erro interno ao carregar usuários');
      }
    }

  async create(data: any) {
    const usuario = Usuario.create({ ...data });

    return await usuario.save();
  }
}

//implementar outras funções