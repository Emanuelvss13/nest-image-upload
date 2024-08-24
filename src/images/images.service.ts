import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from '../global/repository/repo.enum';
import { UpdateImageDto } from './dto/update-image.dto';
import { IImageRepository } from './repositories/image.repository';
import { IStorageProvider } from './repositories/storage.provider';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('CloudinaryStorage')
    readonly storageProvider: IStorageProvider,
    @Inject(REPOSITORY.IMAGE)
    readonly imageRepository: IImageRepository,
  ) {}

  async upload(path: string, userId: string) {
    const { public_id, url } = await this.storageProvider.upload(path);

    return await this.imageRepository.create(url, public_id, userId);
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
