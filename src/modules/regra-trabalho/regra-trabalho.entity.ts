// src/modules/regra-trabalho/regra-trabalho.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('regra_trabalho')
export class RegraTrabalho extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_regra_trabalho' })
    id_regra_trabalho: number;

    @Column({ name: 'descricao_regra_trabalho', nullable: true })
    descricao_regra_trabalho: string;

    @Column({ name: 'horas_descanso_minimas' })
    horas_descanso_minimas: number;
}