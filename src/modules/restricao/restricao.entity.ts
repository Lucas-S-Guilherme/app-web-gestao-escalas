// src/modules/restricao/restricao.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restricao')
export class Restricao extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_restricao' })
  id_restricao: number;

  @Column({ name: 'nome_restricao' })
  nome_restricao: string;

  @Column({ name: 'grupo_restricao' })
  grupo_restricao: string;

  @Column({ name: 'descricao_restricao' })
  descricao_restricao: string;
}