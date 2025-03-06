import { IsNotEmpty } from 'class-validator';

export class CombatenteDto {
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  nome_combatente: string;

  @IsNotEmpty({ message: 'O campo CPF é obrigatório' })
  cpf_combatente: string;

  @IsNotEmpty({ message: 'O campo Data de Nascimento é obrigatório' })
  data_nascimento_combatente: Date;

  @IsNotEmpty({ message: 'O campo Telefone é obrigatório' })
  telefone_combatente: string;

  @IsNotEmpty({ message: 'O campo Email é obrigatório' })
  email_combatente: string;

  @IsNotEmpty({ message: 'O campo Matrícula é obrigatório' })
  matricula_combatente: string;
}