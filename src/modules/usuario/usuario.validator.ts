// usuario.validator.ts
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { BaseValidator } from 'src/common/validator/base.validator';
import { IValidator } from "src/common/validator/interface.validator";
import { UsuarioDto } from "./usuario.dto";

export class UsuarioValidator extends BaseValidator implements IValidator {
  private errors: string[] = [];
  private validatedData: any; // Adicionamos uma propriedade para armazenar os dados validados

  get getErrors(): string[] {
    return this.errors;
  }

  get getData(): any {
    return this.validatedData; // Retornamos os dados validados
  }

  async validate(data: any): Promise<this> {
    const dados = plainToInstance(UsuarioDto, data);
    const errors: ValidationError[] = await validate(dados);

    if (errors.length > 0) {
      this.errors = errors.map(error => Object.values(error.constraints).join(', '));
    } else {
      this.errors = [];
      this.validatedData = dados; // Armazenamos os dados validados
    }

    return this;
  }
}