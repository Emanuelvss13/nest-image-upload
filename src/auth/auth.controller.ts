import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return this.authService.login(data.email, data.password);
  }

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  async whoami(@CurrentUser() user: User) {
    return user;
  }
}
