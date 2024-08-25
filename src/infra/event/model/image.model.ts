import { IImageUpload } from '../../../images/dto/image-upload.dto';

export interface IImageEvent {
  save(data: IImageUpload): Promise<void>;
  delete(
    transactionId: string,
    imageId: string,
    storageId: string,
  ): Promise<void>;
}
