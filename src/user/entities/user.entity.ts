import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../global/entities/base.entity';
import { Image } from '../../images/entities/image.entity';
import { Transaction } from '../../images/entities/transaction.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Image, (Image) => Image.user)
  images: Image[];

  @OneToMany(() => Transaction, (Transaction) => Transaction.user)
  transactions: Transaction[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
