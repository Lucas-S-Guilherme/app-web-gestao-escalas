// src/modules/usuario/dto/create-usuario.dto.ts
import { IsString, IsDate, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  tipo_usuario: string;

  @IsString()
  @IsNotEmpty()
  nome_usuario: string;

  @IsString()
  @IsNotEmpty()
  cpf_usuario: string;

  @IsDate()
  @IsNotEmpty()
  data_nascimento_usuario: Date;

  @IsString()
  @IsOptional() // Telefone é opcional
  telefone_usuario?: string;

  @IsEmail()
  @IsOptional() // Email é opcional
  email_usuario?: string;

  @IsString()
  @IsNotEmpty()
  matricula: string;
}