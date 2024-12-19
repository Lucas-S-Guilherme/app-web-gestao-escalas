import { Injectable } from '@nestjs/common';
import { CreateCombatenteDto } from './dto/create-combatente.dto';
import { UpdateCombatenteDto } from './dto/update-combatente.dto';

@Injectable()
export class CombatenteService {
  create(createCombatenteDto: CreateCombatenteDto) {
    return 'This action adds a new combatente';
  }

  findAll() {
    return `This action returns all combatente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} combatente`;
  }

  update(id: number, updateCombatenteDto: UpdateCombatenteDto) {
    return `This action updates a #${id} combatente`;
  }

  remove(id: number) {
    return `This action removes a #${id} combatente`;
  }
}
