import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Transaction } from './entities/transaction.entity';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Transaction])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
