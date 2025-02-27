// src/modules/especializacao/especializacao.validator.ts
import { plainToInstance } from 'class-transformer';
import { BaseValidator } from 'src/common/validator/base.validator';
import { IValidator } from 'src/common/validator/interface.validator';
import { EspecializacaoDto } from './especializacao.dto';

export class EspecializacaoValidator extends BaseValidator implements IValidator {
  isError: any;
  async validate(data: any): Promise<this> {
    const dados = plainToInstance(EspecializacaoDto, data);
    await this.validator(dados);
    this.setData(dados); // Define os dados validados
    return this;
  }
}