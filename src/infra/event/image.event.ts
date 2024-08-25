import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { REPOSITORY } from '../../global/repository/repo.enum';
import { IImageDelete } from '../../images/dto/image-delete.dto';
import { IImageUpload } from '../../images/dto/image-upload.dto';
import { TransactionStatus } from '../../images/entities/transaction-status.enum';
import { IImageRepository } from '../../images/repositories/image.repository';
import { IStorageProvider } from '../../images/repositories/storage.provider';
import { IImageEvent } from './model/image.model';

@Injectable()
export class ImageEvents implements IImageEvent {
  constructor(
    @Inject('CloudinaryStorage')
    readonly storageProvider: IStorageProvider,
    @Inject(REPOSITORY.IMAGE)
    readonly imageRepository: IImageRepository,
  ) {}

  @OnEvent('image.delete')
  async delete({
    transactionId,
    imageId,
    storageId,
  }: IImageDelete): Promise<void> {
    await this.imageRepository.updateTransaction(
      transactionId,
      null,
      TransactionStatus.DELETE,
      'Apagando imagem no servidor.',
    );

    try {
      await this.imageRepository.delete(imageId);
    } catch (error) {
      await this.imageRepository.updateTransaction(
        transactionId,
        null,
        TransactionStatus.ERROR,
        'Erro ao apagar imagem do banco de dados: ' + (error.message || error),
      );
      return;
    }

    try {
      await this.storageProvider.delete(storageId);
    } catch (error) {
      await this.imageRepository.updateTransaction(
        transactionId,
        null,
        TransactionStatus.ERROR,
        'Erro ao apagar imagem no servidor: ' + (error.message || error),
      );
      return;
    }

    await this.imageRepository.updateTransaction(
      transactionId,
      null,
      TransactionStatus.SUCCESS,
      'Imagem apagada com sucesso.',
    );
  }

  @OnEvent('image.upload')
  async save({ path, transactionId, userId }: IImageUpload): Promise<void> {
    await this.imageRepository.updateTransaction(
      transactionId,
      null,
      TransactionStatus.UPLOADING,
      'Enviando Imagem ao servidor.',
    );

    let uploadResult;

    try {
      uploadResult = await this.storageProvider.upload(path);
      if (!uploadResult) {
        throw new InternalServerErrorException(
          'Resultado do upload está vazio.',
        );
      }
    } catch (error) {
      await this.imageRepository.updateTransaction(
        transactionId,
        null,
        TransactionStatus.ERROR,
        'Erro ao fazer upload ao servidor: ' + (error.message || error),
      );
      return;
    }

    const { public_id, url } = uploadResult;

    let image;

    try {
      image = await this.imageRepository.create({
        storageId: public_id,
        url,
        userId,
      });
      if (!image) {
        throw new Error('A criação de imagem no banco de dados falhou.');
      }
    } catch (error) {
      await this.storageProvider.delete(public_id);

      await this.imageRepository.updateTransaction(
        transactionId,
        null,
        TransactionStatus.ERROR,
        'Erro ao salvar metadados da imagem no banco de dados: ' +
          (error.message || error),
      );
      return;
    }

    await this.imageRepository.updateTransaction(
      transactionId,
      image.id,
      TransactionStatus.SUCCESS,
      'Upload Concluído.',
    );
  }
}
