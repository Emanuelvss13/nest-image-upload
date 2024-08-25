import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../global/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Image extends BaseEntity {
  @Column()
  url: string;

  @Column()
  storageId: string;

  @ManyToOne(() => User, (User) => User.images)
  user: User;

  @OneToOne(() => Transaction, (Transaction) => Transaction.image)
  transaction: Transaction;

  public belongsToUser(userId: string): boolean {
    return userId === this.user.id;
  }
}
