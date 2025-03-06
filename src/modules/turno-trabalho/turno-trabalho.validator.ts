import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BaseValidator } from 'src/common/validator/base.validator';
import { IValidator } from 'src/common/validator/interface.validator';
import { TurnoTrabalhoDto } from './turno-trabalho.dto';

export class TurnoTrabalhoValidator extends BaseValidator implements IValidator {
  private errors: string[] = [];
  private validatedData: any;

  get getErrors(): string[] {
    return this.errors;
  }

  get getData(): any {
    return this.validatedData;
  }

  async validate(data: any): Promise<this> {
    const dto = plainToInstance(TurnoTrabalhoDto, data);
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
      this.errors = errors.map((error) => Object.values(error.constraints).join(', '));
    } else {
      this.errors = [];
      this.validatedData = dto;
    }

    return this;
  }
}
