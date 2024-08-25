import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from '../global/repository/repo.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORY.USER)
    readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (!existUser) {
      throw new BadRequestException('Email ja utilizado.');
    }

    const user = await this.userRepository.create(createUserDto);

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    currentUserId: string,
  ): Promise<User> {
    if (id !== currentUserId) {
      throw new BadRequestException(
        'Não é possível atualizar outros usuários.',
      );
    }

    if (updateUserDto.email) {
      const existUser = await this.userRepository.findByEmail(
        updateUserDto.email,
      );

      if (existUser) {
        throw new BadRequestException('Email ja utilizado.');
      }
    }

    const user = await this.userRepository.update({
      id,
      ...updateUserDto,
    });

    return user;
  }

  async delete(id: string, currentUserId: string) {
    if (id !== currentUserId) {
      throw new BadRequestException('Não é possível apagar outros usuários.');
    }

    return await this.userRepository.delete(id);
  }
}
