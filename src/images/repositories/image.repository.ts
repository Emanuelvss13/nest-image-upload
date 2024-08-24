import { Image } from '../entities/image.entity';

export interface IImageRepository {
  create(url: string, storageId: string, userId: string): Promise<Image>;
  delete(): Promise<void>;
}
