import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../../../images/entities/image.entity';
import { IImageRepository } from '../../../images/repositories/image.repository';

@Injectable()
export class ImageRepository implements IImageRepository {
  constructor(
    @InjectRepository(Image)
    private typeorm: Repository<Image>,
  ) {}

  async findById(id: string): Promise<Image> {
    const image = await this.typeorm.findOne({
      where: {
        id,
      },
      relations: { user: true },
    });

    return image;
  }

  async create(url: string, storageId: string, userId: string): Promise<Image> {
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
