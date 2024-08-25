import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Readable } from 'typeorm/platform/PlatformTools';
import { Image } from '../../images/entities/image.entity';
import { IStorageProvider } from '../../images/repositories/storage.provider';

@Injectable()
export class CheckInconsistency {
  private readonly logger = new Logger('CheckInconsistency');

  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @Inject('CloudinaryStorage')
    private readonly storageProvider: IStorageProvider,
  ) {}

  async check() {
    this.logger.log(
      'Iniciando verificação de inconsistências entre o Cloudinary e o banco de dados.',
    );

    const stream = await this.imageRepository
      .createQueryBuilder('image')
      .stream();

    for await (const image of stream as unknown as Readable) {
      try {
        const exists = await this.storageProvider.exists(image.image_storageId);

        if (!exists) {
          this.logger.warn(
            `Imagem com ID ${image.image_storageId} não encontrada no Cloudinary. Removendo do banco de dados...`,
          );
          await this.imageRepository.delete({ id: image.image_id });
        }
      } catch (error) {
        this.logger.error(
          `Erro ao verificar imagem com ID ${image.image_storageId}: ${error.message}`,
        );
      }
    }

    this.logger.log('Verificação de inconsistências concluída.');
  }
}
