import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { IUserRepository } from '../../../user/repository/user.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeorm: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.typeorm.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const user = this.typeorm.create(data);
    return await this.typeorm.save(user);
  }

  async update(data: Partial<User>): Promise<User> {
    let user = await this.findById(data.id);

    user = Object.assign(user, data);

    return await this.typeorm.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.typeorm.findOne({
      where: {
        id,
      },
      relations: { images: true },
    });

    return user;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.typeorm.delete({
        id,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi Possível atualizar o usuário: ' + error,
      );
    }

    return true;
  }
}
