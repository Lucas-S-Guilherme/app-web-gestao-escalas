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
      console.log('[DEBUG] Buscando usuário com ID:', id);
      const usuario = await Usuario.findOneBy({ id_usuario: id });
      console.log('[DEBUG] Usuário encontrado:', usuario);
      return usuario;
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

    // usuario.service.ts
    async create(data: any) {
      try {
        console.log('[DEBUG] Dados recebidos no serviço:', data); // Log para depuração

        const usuario = Usuario.create({
          tipo_usuario: data.tipo_usuario,
          nome_usuario: data.nome_usuario,
          cpf_usuario: data.cpf_usuario,
          data_nascimento_usuario: data.data_nascimento_usuario,
          telefone_usuario: data.telefone_usuario,
          email_usuario: data.email_usuario,
          matricula: data.matricula,
        });

        await usuario.save();
        return usuario;
      } catch (error) {
        console.error('[ERRO] Falha ao criar usuário:', error);
        throw new Error('Erro ao criar usuário');
      }
    }
}

//implementar outras funções