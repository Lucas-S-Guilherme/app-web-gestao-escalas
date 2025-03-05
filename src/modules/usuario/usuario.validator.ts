import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator"; // Importe validate e ValidationError
import { BaseValidator } from 'src/common/validator/base.validator';
import { IValidator } from "src/common/validator/interface.validator";
import { UsuarioDto } from "./usuario.dto";

export class UsuarioValidator extends BaseValidator implements IValidator {
    private errors: string[] = []; // Armazena os erros de validação

    // Implementação do getter `getErrors`
    get getErrors(): string[] {
        return this.errors;
    }

    // Implementação do método `validate`
    async validate(data: any): Promise<this> {
        const dados = plainToInstance(UsuarioDto, data);
        const errors: ValidationError[] = await validate(dados); // Valida os dados

        // Captura os erros de validação, se houver
        if (errors.length > 0) {
            this.errors = errors.map(error => Object.values(error.constraints).join(', '));
        } else {
            this.errors = []; // Limpa os erros se não houver nenhum
        }

        return this;
    }
}