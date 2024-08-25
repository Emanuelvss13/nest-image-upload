import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateImageDto } from '../../../images/dto/create-image.dto';
import { Image } from '../../../images/entities/image.entity';
import { TransactionStatus } from '../../../images/entities/transaction-status.enum';
import { Transaction } from '../../../images/entities/transaction.entity';
import { IImageRepository } from '../../../images/repositories/image.repository';

@Injectable()
export class ImageRepository implements IImageRepository {
  constructor(
    @InjectRepository(Image)
    private typeorm: Repository<Image>,
    @InjectRepository(Transaction)
    private typeormTransaction: Repository<Transaction>,
  ) {}
  async findTransactionById(id: string): Promise<Transaction> {
    const transaction = this.typeormTransaction.findOne({
      where: {
        id,
      },
      relations: { image: true },
    });

    return transaction;
  }

  async updateTransaction(
    id: string,
    imageId: string,
    status: TransactionStatus,
    message: string,
  ): Promise<void> {
    await this.typeormTransaction.update(
      {
        id,
      },
      {
        image: {
          id: imageId,
        },
        status,
        message,
      },
    );
  }

  async createTransaction(
    userId: string,
    status: TransactionStatus,
    message: string,
  ): Promise<Transaction> {
    const transaction = await this.typeormTransaction.save({
      status,
      message,
      user: {
        id: userId,
      },
    });

    return transaction;
  }

  async findById(id: string): Promise<Image> {
    const image = await this.typeorm.findOne({
      where: {
        id,
      },
      relations: { user: true },
    });

    return image;
  }

  async create({ url, storageId, userId }: ICreateImageDto): Promise<Image> {
    const image = await this.typeorm.save({
      url,
      storageId,
      user: {
        id: userId,
      },
    });

    return image;
  }
  async delete(id: string): Promise<void> {
    await this.typeorm.delete({ id });
  }
}
