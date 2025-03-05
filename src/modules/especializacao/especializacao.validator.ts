// src/modules/especializacao/especializacao.validator.ts
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BaseValidator } from 'src/common/validator/base.validator';
import { IValidator } from 'src/common/validator/interface.validator';
import { EspecializacaoDto } from './especializacao.dto';

export class EspecializacaoValidator extends BaseValidator implements IValidator {
  private errors: string[] = [];

  get getErrors(): string[] {
    return this.errors;
  }

  async validate(data: any): Promise<this> {
    const dados = plainToInstance(EspecializacaoDto, data);
    const errors: ValidationError[] = await validate(dados);

    if (errors.length > 0) {
      this.errors = errors.map((error) => Object.values(error.constraints).join(', '));
    } else {
      this.errors = [];
    }

    return this;
  }
}