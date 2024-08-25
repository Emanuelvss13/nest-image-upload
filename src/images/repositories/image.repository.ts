import { ICreateImageDto } from '../dto/create-image.dto';
import { Transaction } from '../entities/transaction.entity';
import { Image } from './../entities/image.entity';
import { TransactionStatus } from './../entities/transaction-status.enum';

export interface IImageRepository {
  create(data: ICreateImageDto): Promise<Image>;
  createTransaction(
    userId: string,
    status: TransactionStatus,
    message: string,
  ): Promise<Transaction>;
  updateTransaction(
    id: string,
    imageId: string,
    status: TransactionStatus,
    message: string,
  ): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Image>;
  findTransactionById(id: string): Promise<Transaction>;
  findImagesByUserId(userId: string): Promise<Image[]>;
}
