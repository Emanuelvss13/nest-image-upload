import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { removeUserPassword } from '../global/utils/remove-user-password.util';
import { IUserWithoutPassword } from '../user/entities/reponse/user-without-password.response';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './custom-decorators/auth.guard';
import { CurrentUser } from './custom-decorators/current-user.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return this.authService.login(data.email, data.password);
  }

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  async whoami(@CurrentUser() user: User): Promise<IUserWithoutPassword> {
    return removeUserPassword(user);
  }
}
