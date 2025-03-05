// usuario.dto.ts
import { IsNotEmpty } from 'class-validator';

export class UsuarioDto {
  @IsNotEmpty({ message: 'O campo Tipo de Usuário é obrigatório' })
  tipo_usuario: string; // Adicionei o campo tipo_usuario ao DTO

  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  nome_usuario: string;

  @IsNotEmpty({ message: 'O campo CPF é obrigatório' })
  cpf_usuario: string;

  @IsNotEmpty({ message: 'O campo Data de Nascimento é obrigatório' })
  data_nascimento_usuario: Date;

  @IsNotEmpty({ message: 'O campo Telefone é obrigatório' })
  telefone_usuario: string;

  @IsNotEmpty({ message: 'O campo Email é obrigatório' })
  email_usuario: string;

  @IsNotEmpty({ message: 'O campo Matrícula é obrigatório' })
  matricula: string;

  
}