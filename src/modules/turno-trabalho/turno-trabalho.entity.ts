import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Escala } from 'src/modules/escala/escala.entity';

@Entity('turno_trabalho')
export class TurnoTrabalho extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_turno_trabalho' })
  id_turno_trabalho: number;

  @Column({ type: 'datetime', name: 'data_inicio' })
  data_inicio: Date;

  @Column({ type: 'datetime', name: 'data_fim' })
  data_fim: Date;

  // FK -> Escala
  @ManyToOne(() => Escala, (escala) => escala.turnos, { eager: false })
  @JoinColumn({ name: 'id_escala' })
  escala: Escala;
}
