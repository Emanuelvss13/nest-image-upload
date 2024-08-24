import { BaseEntity, Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Image extends BaseEntity {
  @Column()
  url: string;

  @Column()
  path: string;

  @ManyToOne(() => User, (User) => User.images)
  user: User;

  @OneToOne(() => Transaction, (Transaction) => Transaction.image)
  transaction: Transaction;
}
