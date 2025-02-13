import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    tipo_usuario: string;

    @Column()
    nome_usuario: string;

    @Column({ unique: true})
    cpf_usuario: string;

    @Column()
    data_nascimento_usuario: Date;

    @Column()
    telefone_usuario:string;

    @Column()
    email_usuario: string;

    @Column({unique: true})
    matricula:string;

}