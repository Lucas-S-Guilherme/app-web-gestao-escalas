import { IsNotEmpty, IsNumber } from 'class-validator';

export class RegraTrabalhoDto {
    @IsNotEmpty({ message: 'O campo Descrição é obrigatório' })
    descricao_regra_trabalho: string;

    @IsNotEmpty({ message: 'O campo Horas de Descanso Mínimas é obrigatório' })
    @IsNumber({}, { message: 'O campo Horas de Descanso Mínimas deve ser um número' })
    horas_descanso_minimas: number;
}