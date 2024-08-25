import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { REPOSITORY } from '../global/repository/repo.enum';
import { CloudinaryStorage } from '../infra/cloudinary/cloudinary.provider';
import { ImageEvents } from '../infra/event/image.event';
import { ImageRepository } from '../infra/typeorm/repositories/image-repository.typeorm';
import { Image } from './entities/image.entity';
import { Transaction } from './entities/transaction.entity';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Image, Transaction])],
  controllers: [ImagesController],
  providers: [
    ImageEvents,
    ImagesService,
    {
      provide: REPOSITORY.IMAGE,
      useClass: ImageRepository,
    },
    {
      provide: 'CloudinaryStorage',
      useFactory: (configService: ConfigService) =>
        new CloudinaryStorage(
          configService.get<string>('CLOUD_NAME'),
          configService.get<string>('API_KEY'),
          configService.get<string>('API_SECRET'),
        ),
      inject: [ConfigService],
    },
  ],
})
export class ImagesModule {}
