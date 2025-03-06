import { Injectable } from '@nestjs/common';
import { Combatente } from './combatente.entity';

@Injectable()
export class CombatenteService {
  async delete(id: number) {
    const combatente = await Combatente.findOneBy({ id_combatente: id });
    if (!combatente) {
      return false;
    }

    await combatente.remove();
    return true;
  }

  async update(id: number, data: any) {
    const combatente = await Combatente.findOneBy({ id_combatente: id });
    if (!combatente) {
      return false;
    }

    Object.assign(combatente, data);
    await combatente.save();
    return true;
  }

  async getById(id: number) {
    const combatente = await Combatente.findOneBy({ id_combatente: id });
    return combatente;
  }

  async getAll() {
    const combatentes = await Combatente.find();
    return combatentes;
  }

  async create(data: any) {
    const combatente = Combatente.create({
      nome_combatente: data.nome_combatente,
      cpf_combatente: data.cpf_combatente,
      data_nascimento_combatente: data.data_nascimento_combatente,
      telefone_combatente: data.telefone_combatente,
      email_combatente: data.email_combatente,
      matricula_combatente: data.matricula_combatente,
    });

    await combatente.save();
    return combatente;
  }
}