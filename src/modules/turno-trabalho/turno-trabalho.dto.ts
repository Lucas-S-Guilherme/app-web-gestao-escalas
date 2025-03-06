import { IsNotEmpty } from 'class-validator';

export class TurnoTrabalhoDto {
  @IsNotEmpty({ message: 'A data de início é obrigatória.' })
  data_inicio: Date;

  @IsNotEmpty({ message: 'A data de fim é obrigatória.' })
  data_fim: Date;

  @IsNotEmpty({ message: 'O campo Escala é obrigatório.' })
  id_escala: number;
}
