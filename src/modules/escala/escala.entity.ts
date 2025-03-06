import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('escala')
export class Escala extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_escala' })
  id_escala: number;

  @Column({ name: 'nome_escala' })
  nome_escala: string;

  @Column({ name: 'local_trabalho' })
  local_trabalho: string;

  @Column({ name: 'data_inicio' })
  data_inicio: Date;

  @Column({ name: 'data_fim' })
  data_fim: Date;

  @Column({ name: 'data_confeccao', default: () => 'CURRENT_TIMESTAMP' })
  data_confeccao: Date;

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario,  { eager: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
    turnos: any;
}