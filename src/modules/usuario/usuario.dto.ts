import { IsNotEmpty } from 'class-validator';

export class UsuarioDto {
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo CPF é obrigatório' })
  cpf: string;

  //implementar restante de validações para os outros atributos

}
