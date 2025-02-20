// src/modules/usuario/usuario.service.ts
import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';



@Injectable()
export class UsuarioService {
  async getAll() {
    return await Usuario.find();
  }

  async create(data: any) {
    const usuario = Usuario.create({ ...data });

    return await usuario.save();
  }
}

//implementar outras funções