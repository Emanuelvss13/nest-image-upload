import { BaseEntity } from '../../global/entities/base.entity';

export class User extends BaseEntity {
  username: string;

  email: string;

  password: string;
}
