import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../../images/entities/image.entity';
import { CloudinaryStorage } from '../cloudinary/cloudinary.provider';
import { CheckInconsistency } from './syncronize-database-storage';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Image])],
  providers: [
    CheckInconsistency,
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
export class CheckInconsistencyModule {}
