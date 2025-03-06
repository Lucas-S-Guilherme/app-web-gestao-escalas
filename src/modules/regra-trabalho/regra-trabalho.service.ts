// src/modules/regra-trabalho/regra-trabalho.service.ts
import { Injectable } from '@nestjs/common';
import { RegraTrabalho } from './regra-trabalho.entity';

@Injectable()
export class RegraTrabalhoService {
    async delete(id: number) {
        const regraTrabalho = await RegraTrabalho.findOneBy({ id_regra_trabalho: id });
        if (!regraTrabalho) {
            return false;
        }

        await regraTrabalho.remove();
        return true;
    }

    async update(id: number, data: any) {
        const regraTrabalho = await RegraTrabalho.findOneBy({ id_regra_trabalho: id });
        if (!regraTrabalho) {
            return false;
        }

        Object.assign(regraTrabalho, data);
        await regraTrabalho.save();
        return true;
    }

    async getById(id: number) {
        const regraTrabalho = await RegraTrabalho.findOneBy({ id_regra_trabalho: id });
        return regraTrabalho;
    }

    async getAll() {
        const regrasTrabalho = await RegraTrabalho.find();
        return regrasTrabalho;
    }

    async create(data: any) {
        console.log('Dados recebidos no serviço:', data); // Log para depuração
    
        if (!data || !data.descricao_regra_trabalho || !data.horas_descanso_minimas) {
            throw new Error('Dados inválidos fornecidos para criação da regra de trabalho.');
        }
    
        const regraTrabalho = RegraTrabalho.create({
            descricao_regra_trabalho: data.descricao_regra_trabalho,
            horas_descanso_minimas: data.horas_descanso_minimas,
        });
    
        await regraTrabalho.save();
        return regraTrabalho;
    }
}