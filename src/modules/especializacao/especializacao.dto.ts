// src/modules/especializacao/especializacao.dto.ts
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class EspecializacaoDto {
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  @IsString()
  nome_especializacao: string;

  @IsNotEmpty({ message: 'O campo Descrição é obrigatório' })
  @IsString()
  descricao_especializacao: string;

  @IsNotEmpty({ message: 'O campo Sigla é obrigatório' })
  @IsString()
  @Length(2, 4, { message: 'A sigla deve ter entre 2 e 4 caracteres' })
  sigla_especializacao: string;
}