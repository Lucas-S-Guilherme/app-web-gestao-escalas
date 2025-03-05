import { IsNotEmpty } from 'class-validator';

export class UsuarioDto {
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  nome_usuario: string; // Alterado de 'nome' para 'nome_usuario'

  @IsNotEmpty({ message: 'O campo CPF é obrigatório' })
  cpf_usuario: string; // Alterado de 'cpf' para 'cpf_usuario'

  // Adicione os demais campos seguindo o mesmo padrão
  @IsNotEmpty({ message: 'O campo Data de Nascimento é obrigatório' })
  data_nascimento_usuario: Date;

  @IsNotEmpty({ message: 'O campo Telefone é obrigatório' })
  telefone_usuario: string;

  @IsNotEmpty({ message: 'O campo Email é obrigatório' })
  email_usuario: string;

  @IsNotEmpty({ message: 'O campo Matrícula é obrigatório' })
  matricula: string;
}