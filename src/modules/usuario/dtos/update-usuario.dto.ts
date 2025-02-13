// src/modules/usuario/dto/update-usuario.dto.ts
import { IsString, IsDate, IsEmail, IsOptional } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  tipo_usuario?: string;

  @IsString()
  @IsOptional()
  nome_usuario?: string;

  @IsString()
  @IsOptional()
  cpf_usuario?: string;

  @IsDate()
  @IsOptional()
  data_nascimento_usuario?: Date;

  @IsString()
  @IsOptional()
  telefone_usuario?: string;

  @IsEmail()
  @IsOptional()
  email_usuario?: string;

  @IsString()
  @IsOptional()
  matricula?: string;
}