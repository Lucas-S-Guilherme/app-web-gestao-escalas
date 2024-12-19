import { PartialType } from '@nestjs/mapped-types';
import { CreateCombatenteDto } from './create-combatente.dto';

export class UpdateCombatenteDto extends PartialType(CreateCombatenteDto) {}
