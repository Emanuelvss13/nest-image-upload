import { Injectable } from '@nestjs/common';
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
    const user = await this.typeorm.findOneOrFail({
      where: {
        email,
      },
    });

    return user;
  }

  create(data: Omit<User, 'id'>): Promise<User> {
    const user = this.typeorm.create(data);
    return this.typeorm.save(user);
  }

  update(data: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
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

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
