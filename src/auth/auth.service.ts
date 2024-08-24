import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email não encontrado');
    }

    const validPassword = await user.validatePassword(pass);

    if (!validPassword) {
      throw new UnauthorizedException('Senha inválida');
    }

    const payload = {
      sub: user.id,
      email: email,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload);

    if (!token) {
      throw new BadRequestException('Não foi possível gerar o JWT Token!');
    }
    return {
      access_token: token,
    };
  }
}
