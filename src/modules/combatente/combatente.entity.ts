import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('combatente')
export class Combatente extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_combatente' })
    id_combatente: number;

    @Column({ name: 'nome_combatente' })
    nome_combatente: string;

    @Column({ unique: true, name: 'cpf_combatente' })
    cpf_combatente: string;

    @Column({ name: 'data_nascimento_combatente' })
    data_nascimento_combatente: Date;

    @Column({ name: 'telefone_combatente' })
    telefone_combatente: string;

    @Column({ name: 'email_combatente' })
    email_combatente: string;

    @Column({ unique: true, name: 'matricula_combatente' })
    matricula_combatente: string;

    @Column({ name: 'ultimo_turno_trabalhado', nullable: true })
    ultimo_turno_trabalhado: Date;
}