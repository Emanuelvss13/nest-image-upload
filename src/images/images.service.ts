import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { REPOSITORY } from '../global/repository/repo.enum';
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

  async findOne(id: string) {
    const image = await this.imageRepository.findById(id);

    if (!image) {
      throw new BadGatewayException('Imagem não encontrada.');
    }

    return image;
  }

  async delete(imageId: string, currentUserId: string) {
    const image = await this.findOne(imageId);

    if (!image.belongsToUser(currentUserId)) {
      throw new BadRequestException(
        'Você não pode apagar as imagens de outro usuário',
      );
    }

    await this.storageProvider.delete(image.storageId);

    await this.imageRepository.delete(image.id);
  }
}
