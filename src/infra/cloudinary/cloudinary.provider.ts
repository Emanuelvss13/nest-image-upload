import { HttpStatus } from '@nestjs/common';
import { IStorageProvider } from '../../images/repositories/storage.provider';

import { v2 as cloudinary } from 'cloudinary';

export class CloudinaryStorage implements IStorageProvider {
  constructor(
    private cloudName: string,
    private apiKey: string,
    private apiSecret: string,
  ) {
    cloudinary.config({
      cloud_name: this.cloudName,
      api_key: this.apiKey,
      api_secret: this.apiSecret,
    });
  }
  async exists(publicId: string): Promise<boolean> {
    const result = await cloudinary.api.resource(publicId).catch((e) => e);

    if (result.error?.http_code === HttpStatus.NOT_FOUND) {
      return false;
    }

    return true;
  }

  async upload(path: string) {
    const { url, public_id } = await cloudinary.uploader.upload(path, {
      folder: 'uploads',
    });

    return { url, public_id };
  }

  async delete(storageId: string): Promise<void> {
    await cloudinary.uploader.destroy(storageId);
  }
}
