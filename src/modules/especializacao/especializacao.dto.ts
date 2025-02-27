// src/modules/especializacao/especializacao.dto.ts
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class EspecializacaoDto {
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  @IsString({ message: 'O campo Nome deve ser uma string' })
  nome: string;

  @IsNotEmpty({ message: 'O campo Descrição é obrigatório' })
  @IsString({ message: 'O campo Descrição deve ser uma string' })
  descricao: string;

  @IsNotEmpty({ message: 'O campo Sigla é obrigatório' })
  @Length(2, 4, { message: 'A Sigla deve ter entre 2 e 4 caracteres' })
  sigla: string;
}