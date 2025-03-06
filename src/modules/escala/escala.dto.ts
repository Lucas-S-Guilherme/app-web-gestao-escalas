import { IsNotEmpty } from 'class-validator';

export class EscalaDto {
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  nome_escala: string;

  @IsNotEmpty({ message: 'O campo Local de Trabalho é obrigatório' })
  local_trabalho: string;

  @IsNotEmpty({ message: 'O campo Data de Início é obrigatório' })
  data_inicio: Date;

  @IsNotEmpty({ message: 'O campo Data de Fim é obrigatório' })
  data_fim: Date;

  @IsNotEmpty({ message: 'O campo Usuário é obrigatório' })
  id_usuario: number;
}