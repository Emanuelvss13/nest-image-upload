import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/custom-decorators/auth.guard';
import { CurrentUser } from '../auth/custom-decorators/current-user.decorator';
import { removeUserPassword } from '../global/utils/remove-user-password.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserWithoutPassword } from './entities/reponse/user-without-password.response';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IUserWithoutPassword> {
    const user = await this.userService.create(createUserDto);

    return removeUserPassword(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<IUserWithoutPassword> {
    const user = await this.userService.findOne(id);

    return removeUserPassword(user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() { id: currentUserId }: User,
  ): Promise<IUserWithoutPassword> {
    const user = await this.userService.update(
      id,
      updateUserDto,
      currentUserId,
    );

    return removeUserPassword(user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @CurrentUser() { id: currentUserId }: User) {
    return this.userService.delete(id, currentUserId);
  }
}
