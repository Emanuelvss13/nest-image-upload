import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { REPOSITORY } from '../global/repository/repo.enum';
import { IImageRepository } from './repositories/image.repository';
import { IStorageProvider } from './repositories/storage.provider';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('CloudinaryStorage')
    readonly storageProvider: IStorageProvider,
    private eventEmitter: EventEmitter2,
    @Inject(REPOSITORY.IMAGE)
    readonly imageRepository: IImageRepository,
  ) {}

  async findTransactionById(id: string) {
    const transaction = await this.imageRepository.findTransactionById(id);

    if (!transaction) {
      throw new BadRequestException('Transação não encontrada.');
    }

    return transaction;
  }

  async upload(path: string, userId: string) {
    const transaction = await this.imageRepository.createTransaction(userId);

    this.eventEmitter.emit('image.upload', {
      path,
      transactionId: transaction.id,
      userId,
    });

    return transaction;
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
