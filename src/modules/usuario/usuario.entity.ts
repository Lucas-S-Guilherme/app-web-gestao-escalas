import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Escala } from '../escala/escala.entity';

@Entity('usuario')
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'tipo_usuario' })
  tipo_usuario: string;

  @Column({ name: 'nome_usuario' })
  nome_usuario: string;

  @Column({ unique: true, name: 'cpf_usuario' })
  cpf_usuario: string;

  @Column({ name: 'data_nascimento_usuario' })
  data_nascimento_usuario: Date;

  @Column({ name: 'telefone_usuario' })
  telefone_usuario: string;

  @Column({ name: 'email_usuario' })
  email_usuario: string;

  @Column({ name: 'matricula' })
  matricula: string;

  @OneToMany(() => Escala, escala => escala.usuario)
  escalas: Escala[];
}