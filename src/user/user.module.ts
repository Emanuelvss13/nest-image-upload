import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { REPOSITORY } from '../global/repository/repo.enum';
import { UserRepository } from '../infra/typeorm/repositories/user-repository.typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: REPOSITORY.USER,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
