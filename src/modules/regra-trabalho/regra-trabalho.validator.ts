import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { BaseValidator } from 'src/common/validator/base.validator';
import { IValidator } from "src/common/validator/interface.validator";
import { RegraTrabalhoDto } from "./regra-trabalho.dto";

export class RegraTrabalhoValidator extends BaseValidator implements IValidator {
    private errors: string[] = [];
    private validatedData: any;

    get getErrors(): string[] {
        return this.errors;
    }

    get getData(): any {
        return this.validatedData;
    }

    async validate(data: any): Promise<this> {
        // Converte os dados brutos em uma instância do DTO
        const dados = plainToInstance(RegraTrabalhoDto, data);

        // Valida a instância do DTO
        const errors: ValidationError[] = await validate(dados);

        if (errors.length > 0) {
            // Se houver erros, mapeia as mensagens de erro
            this.errors = errors.map(error => Object.values(error.constraints).join(', '));
        } else {
            // Se não houver erros, atribui os dados validados
            this.errors = [];
            this.validatedData = {
                descricao_regra_trabalho: dados.descricao_regra_trabalho,
                horas_descanso_minimas: Number(dados.horas_descanso_minimas), // Converte para número
            };
        }

        return this;
    }
}