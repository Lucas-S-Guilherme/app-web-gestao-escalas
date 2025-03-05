// src/modules/especializacao/especializacao.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('funcao')
export class Funcao extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_funcao' })
  id_funcao: number;

  @Column({ name: 'nome_funcao' })
  nome_funcao: string;

  
  @Column({ name: 'sigla_funcao' })
  sigla_funcao: string;
}