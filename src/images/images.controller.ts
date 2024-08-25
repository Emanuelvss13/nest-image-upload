import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/custom-decorators/auth.guard';
import { CurrentUser } from '../auth/custom-decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'dist/src/tmp',
        filename: (req, file, cb) => {
          const filename = `${randomUUID()}-${Date.now()}-image`;
          const extension = extname(file.originalname);

          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: User) {
    const fileType = file.mimetype.split('/')[0];

    if (fileType !== 'image') {
      throw new BadRequestException('Envie apenas imagens!');
    }

    return this.imagesService.upload(file.path, user.id);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @CurrentUser() { id: currentUserId }: User) {
    return this.imagesService.delete(id, currentUserId);
  }
}
