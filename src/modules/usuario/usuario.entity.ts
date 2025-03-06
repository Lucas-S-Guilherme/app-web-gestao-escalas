import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'tipo_usuario', length: 50 })
  tipo_usuario: string;

  @Column({ name: 'nome_usuario', length: 255 })
  nome_usuario: string;

  @Column({ name: 'cpf_usuario', length: 11, unique: true })
  cpf_usuario: string;

  @Column({ name: 'data_nascimento_usuario', type: 'date' })
  data_nascimento_usuario: Date;

  @Column({ name: 'telefone_usuario', length: 11, nullable: true })
  telefone_usuario: string;

  @Column({ name: 'email_usuario', length: 255, nullable: true })
  email_usuario: string;

  @Column({ name: 'matricula', length: 9 })
  matricula: string;

  // Campo adicional para status
  @Column({ name: 'status_usuario', length: 20, default: 'ATIVO' })
  status_usuario: string;
}
