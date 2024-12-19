import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CombatenteService } from './combatente.service';
import { CreateCombatenteDto } from './dto/create-combatente.dto';
import { UpdateCombatenteDto } from './dto/update-combatente.dto';

@Controller('combatente')
export class CombatenteController {
  constructor(private readonly combatenteService: CombatenteService) {}

  @Post()
  create(@Body() createCombatenteDto: CreateCombatenteDto) {
    return this.combatenteService.create(createCombatenteDto);
  }

  @Get()
  findAll() {
    return this.combatenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.combatenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCombatenteDto: UpdateCombatenteDto) {
    return this.combatenteService.update(+id, updateCombatenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.combatenteService.remove(+id);
  }
}
