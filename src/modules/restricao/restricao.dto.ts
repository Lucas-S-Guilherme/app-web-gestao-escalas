// src/modules/restricao/restricao.dto.ts
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RestricaoDto {
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  @IsString()
  nome_restricao: string;

  @IsNotEmpty({ message: 'O campo Grupo é obrigatório' })
  @IsString()
  @Length(2, 2, { message: 'O grupo deve ter exatamente 2 caracteres' })
  grupo_restricao: string;

  @IsNotEmpty({ message: 'O campo Descrição é obrigatório' })
  @IsString()
  descricao_restricao: string;
}