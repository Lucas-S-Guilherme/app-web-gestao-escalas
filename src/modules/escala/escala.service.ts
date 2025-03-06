import { Injectable } from '@nestjs/common';
import { Escala } from './escala.entity';

@Injectable()
export class EscalaService {
  async delete(id: number) {
    const escala = await Escala.findOneBy({ id_escala: id });
    if (!escala) {
      return false;
    }

    await escala.remove();
    return true;
  }

  async update(id: number, data: any) {
    const escala = await Escala.findOneBy({ id_escala: id });
    if (!escala) {
      return false;
    }

    Object.assign(escala, data);
    await escala.save();
    return true;
  }

  async getById(id: number) {
    const escala = await Escala.findOneBy({ id_escala: id });
    return escala;
  }

  async getAll() {
    const escalas = await Escala.find();
    return escalas;
  }

  async create(data: any) {
    const escala = Escala.create({
      nome_escala: data.nome_escala,
      local_trabalho: data.local_trabalho,
      data_inicio: data.data_inicio,
      data_fim: data.data_fim,
      usuario: { id_usuario: data.id_usuario },
    });

    await escala.save();
    return escala;
  }
}