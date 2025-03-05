// src/modules/funcao/funcao.dto.ts
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class FuncaoDto {
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  @IsString()
  nome_funcao: string;

  @IsNotEmpty({ message: 'O campo Sigla é obrigatório' })
  @IsString()
  @Length(2, 4, { message: 'A sigla deve ter entre 2 e 4 caracteres' })
  sigla_funcao: string;
}