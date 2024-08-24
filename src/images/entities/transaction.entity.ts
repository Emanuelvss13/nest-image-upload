import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../global/entities/base.entity';
import { Image } from './image.entity';
import { TransactionStatus } from './transaction-status.enum';

@Entity()
export class Transaction extends BaseEntity {
  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.UPLOADING,
  })
  status: TransactionStatus;

  @Column()
  message: string;

  @OneToOne(() => Image, (Image) => Image.transaction)
  image: Image;
}
