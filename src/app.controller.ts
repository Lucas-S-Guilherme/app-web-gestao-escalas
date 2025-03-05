import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('home')
  home() {
    return {};
  }

  @Get('/usuario')
  @Render('usuario/index') // Renderiza a lista de usuários
  usuario() {
    return {};
  }



}
