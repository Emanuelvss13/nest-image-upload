import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/auth.guard';
import { REPOSITORY } from '../global/repository/repo.enum';
import { UserRepository } from '../infra/typeorm/repositories/user-repository.typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    JwtAuthGuard,
    UserService,
    {
      provide: REPOSITORY.USER,
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
