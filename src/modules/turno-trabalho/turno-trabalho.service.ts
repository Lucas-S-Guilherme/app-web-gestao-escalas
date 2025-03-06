import { Injectable } from '@nestjs/common';
import { TurnoTrabalho } from './turno-trabalho.entity';
import { Escala } from 'src/modules/escala/escala.entity';

@Injectable()
export class TurnoTrabalhoService {
  async getAll() {
    // Se quiser trazer a entidade escala junto, use relations:
    // return await TurnoTrabalho.find({ relations: ['escala'] });
    return await TurnoTrabalho.find({ relations: ['escala'] });
  }

  async getById(id: number) {
    // Carrega um turno_trabalho específico e sua escala
    return await TurnoTrabalho.findOne({
      where: { id_turno_trabalho: id },
      relations: ['escala'],
    });
  }

  async create(data: any) {
    // Buscar a Escala pelo id_escala, para atribuir no relacionamento
    const escala = await Escala.findOneBy({ id_escala: data.id_escala });
    if (!escala) {
      throw new Error('Escala não encontrada');
    }

    const turno = TurnoTrabalho.create({
      data_inicio: data.data_inicio,
      data_fim: data.data_fim,
      escala: escala,
    });

    return await turno.save();
  }

  async update(id: number, data: any) {
    // Verifica se o registro existe
    const turno = await TurnoTrabalho.findOneBy({ id_turno_trabalho: id });
    if (!turno) {
      return false;
    }

    // Atualizar datas
    turno.data_inicio = data.data_inicio;
    turno.data_fim = data.data_fim;

    // Atualizar escala, caso altere
    const escala = await Escala.findOneBy({ id_escala: data.id_escala });
    if (!escala) {
      throw new Error('Escala não encontrada');
    }
    turno.escala = escala;

    await turno.save();
    return true;
  }

  async delete(id: number) {
    const turno = await TurnoTrabalho.findOneBy({ id_turno_trabalho: id });
    if (!turno) {
      return false;
    }

    await turno.remove();
    return true;
  }
}
