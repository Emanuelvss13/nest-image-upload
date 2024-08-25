import { Image } from '../../../images/entities/image.entity';

export interface IUserWithoutPassword {
  id: string;

  username: string;

  email: string;

  images: Image[];

  createdAt: Date;

  updatedAt: Date;
}
