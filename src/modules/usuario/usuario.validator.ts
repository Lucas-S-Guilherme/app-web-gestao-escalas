import { plainToInstance } from "class-transformer";
import { BaseValidator } from 'src/commom/validator/base.validator'
import { IValidator } from "src/commom/validator/interface.validator";
import { UsuarioDto } from "./usuario.dto";
export class UsuarioValidator extends BaseValidator implements IValidator {
    validate(data: any): Promise<this> {
        const dados = plainToInstance(UsuarioDto, data);
        return this.validator(dados);
    }
}