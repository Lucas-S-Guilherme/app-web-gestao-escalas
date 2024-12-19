import { Controller } from '@nestjs/common';
import { EscalaService } from './escala.service';

@Controller('escala')
export class EscalaController {
  constructor(private readonly escalaService: EscalaService) {}
}
