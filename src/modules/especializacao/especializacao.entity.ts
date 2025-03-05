// src/modules/especializacao/especializacao.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('especializacao')
export class Especializacao extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_especializacao' })
  id_especializacao: number;

  @Column({ name: 'nome_especializacao' })
  nome_especializacao: string;

  @Column({ name: 'descricao_especializacao' })
  descricao_especializacao: string;

  @Column({ name: 'sigla_especializacao' })
  sigla_especializacao: string;
}